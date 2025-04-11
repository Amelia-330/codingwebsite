import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Send,
  User,
  Loader2,
  Code,
  Lightbulb,
  BookOpen,
  MessageSquare,
  PenTool,
  Sparkles,
  History,
  Trash2,
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeSnippet?: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

interface QuickPrompt {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  prompt: string;
}

const STORAGE_KEY = 'ai_tutor_history';

export function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setChatHistory(parsed.map((session: any) => ({
        ...session,
        timestamp: new Date(session.timestamp),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })));
    }
  }, []);

  // 保存历史记录
  useEffect(() => {
    if (messages.length > 0) {
      const currentSession: ChatSession = {
        id: currentSessionId,
        title: messages[0].content.slice(0, 30) + "...",
        timestamp: new Date(),
        messages: messages
      };

      const updatedHistory = chatHistory.filter(session => session.id !== currentSessionId);
      const newHistory = [currentSession, ...updatedHistory];
      setChatHistory(newHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    }
  }, [messages]);

  const quickPrompts: QuickPrompt[] = [
    {
      id: "basics",
      title: "基础概念",
      description: "理解创意编程的核心概念",
      icon: <BookOpen className="h-5 w-5" />,
      prompt: "请解释创意编程中的基础概念",
    },
    {
      id: "debug",
      title: "代码调试",
      description: "帮助解决代码问题",
      icon: <Code className="h-5 w-5" />,
      prompt: "我的代码有问题，能帮我检查一下吗",
    },
    {
      id: "practice",
      title: "练习建议",
      description: "获取针对性的练习建议",
      icon: <PenTool className="h-5 w-5" />,
      prompt: "推荐一些练习项目",
    },
    {
      id: "creative",
      title: "创意激发",
      description: "获取创意项目灵感",
      icon: <Sparkles className="h-5 w-5" />,
      prompt: "给我一些创意项目的灵感",
    },
  ];

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    setSelectedTopic(prompt.id);
    handleSendMessage(prompt.prompt);
  };

  const handleSendMessage = async (content: string = inputMessage) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const aiResponses = getAIResponse(content, selectedTopic);
      setMessages(prev => [...prev, aiResponses]);
      setIsLoading(false);
    }, 1000);
  };

  const loadChatSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
  };

  const startNewChat = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([]);
    setSelectedTopic(null);
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    startNewChat();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* 历史记录侧边栏 */}
          <div className="col-span-12 md:col-span-3">
            <Card className="h-[700px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-4 w-4" />
                  聊天记录
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={startNewChat}>
                    新对话
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearHistory}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[620px] pr-4">
                  <div className="space-y-2">
                    {chatHistory.map((session) => (
                      <Button
                        key={session.id}
                        variant="ghost"
                        className={`w-full justify-start text-left ${
                          currentSessionId === session.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => loadChatSession(session)}
                      >
                        <div className="truncate">
                          <p className="font-medium truncate">{session.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* 主聊天区域 */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="flex-none space-y-1.5 pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI 编程家教
                </CardTitle>
                <CardDescription>
                  你的专属编程学习助手，随时为你解答问题
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 pt-0">
                <div className="flex-1 overflow-hidden">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="text-lg font-medium">开始你的学习之旅</h3>
                        <p className="text-muted-foreground">
                          选择一个主题或直接提出你的问题
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-[520px] pr-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`flex gap-3 w-[80%] ${
                                message.type === 'user'
                                  ? 'flex-row-reverse'
                                  : 'flex-row'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  message.type === 'user'
                                    ? 'bg-primary'
                                    : 'bg-secondary'
                                }`}
                              >
                                {message.type === 'user' ? (
                                  <User className="h-4 w-4 text-primary-foreground" />
                                ) : (
                                  <Bot className="h-4 w-4" />
                                )}
                              </div>
                              <div
                                className={`rounded-lg p-4 break-words ${
                                  message.type === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.codeSnippet && (
                                  <pre className="mt-2 p-2 bg-background rounded text-sm overflow-x-auto">
                                    <code>{message.codeSnippet}</code>
                                  </pre>
                                )}
                                <p className="text-xs mt-2 opacity-70">
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="flex gap-3 w-[80%]">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4" />
                              </div>
                              <div className="rounded-lg p-4 bg-muted">
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  )}
                </div>
                <div className="flex-none mt-4 flex gap-2">
                  <Input
                    placeholder="输入你的问题..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={() => handleSendMessage()} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧功能区 */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            {/* 快速提问 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  快速提问
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {quickPrompts.map((prompt) => (
                    <Button
                      key={prompt.id}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <div className="flex items-center gap-2">
                        {prompt.icon}
                        <span className="font-medium">{prompt.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground text-left">
                        {prompt.description}
                      </p>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 学习建议 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  学习建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 从基础概念开始，逐步深入</p>
                  <p>• 多动手实践，创建小项目</p>
                  <p>• 遇到问题时及时提问</p>
                  <p>• 参考优秀作品获取灵感</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAIResponse(question: string, topic: string | null): Message {
  let response: string;
  let codeSnippet: string | undefined;

  switch (topic) {
    case 'basics':
      response = "创意编程的核心概念包括：\n1. 图形绘制\n2. 动画原理\n3. 交互设计\n4. 算法思维";
      codeSnippet = `// 基本图形绘制示例
size(400, 400);
background(255);
ellipse(200, 200, 50, 50);`;
      break;
    case 'debug':
      response = "让我帮你检查代码。通常出现问题的几个常见原因：\n1. 语法错误\n2. 逻辑错误\n3. 初始化问题";
      break;
    case 'practice':
      response = "这里有一些很好的练习项目建议：\n1. 创建一个简单的画板\n2. 制作一个粒子系统\n3. 实现一个简单的游戏";
      codeSnippet = `// 简单画板示例
void draw() {
  if (mousePressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}`;
      break;
    case 'creative':
      response = "这些创意项目可能会激发你的灵感：\n1. 音乐可视化\n2. 生成艺术\n3. 互动装置";
      break;
    default:
      response = "我来帮你解答这个问题。让我们一步步分析...";
  }

  return {
    id: (Date.now() + 1).toString(),
    type: 'ai',
    content: response,
    timestamp: new Date(),
    codeSnippet,
  };
}