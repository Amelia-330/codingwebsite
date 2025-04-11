import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Bookmark, TrendingUp, MessageCircle, ThumbsUp, Eye, Clock } from "lucide-react";

export function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Community Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                活跃用户
              </CardTitle>
              <CardDescription>2,345</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                今日讨论
              </CardTitle>
              <CardDescription>128</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                热门话题
              </CardTitle>
              <CardDescription>56</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discussion List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">社区讨论</h2>
              <Button>发起讨论</Button>
            </div>

            <div className="flex gap-4 mb-6">
              <Input
                placeholder="搜索讨论..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Tabs defaultValue="latest">
              <TabsList className="mb-6">
                <TabsTrigger value="latest">最新</TabsTrigger>
                <TabsTrigger value="hot">热门</TabsTrigger>
                <TabsTrigger value="featured">精选</TabsTrigger>
              </TabsList>

              <TabsContent value="latest">
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl hover:text-primary cursor-pointer">
                              {discussion.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                              <img
                                src={discussion.author.avatar}
                                alt={discussion.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span>{discussion.author.name}</span>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{discussion.time}</span>
                            </CardDescription>
                          </div>
                          <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                            {discussion.category}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{discussion.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hot Topics */}
            <Card>
              <CardHeader>
                <CardTitle>热门话题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hotTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center gap-2">
                      <span className="text-lg font-bold text-muted-foreground">#{topic.id}</span>
                      <div>
                        <p className="font-medium hover:text-primary cursor-pointer">
                          {topic.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{topic.discussions} 个讨论</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle>活跃用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.contributions} 个贡献</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const discussions = [
  {
    id: 1,
    title: "如何开始创意编程学习？",
    content: "我是编程新手，对创意编程很感兴趣，请问从哪里开始学习比较好？",
    author: {
      name: "新手程序员",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    category: "学习经验",
    time: "2小时前",
    likes: 24,
    comments: 12,
    views: 156,
  },
  {
    id: 2,
    title: "分享：我的第一个生成艺术作品",
    content: "经过两个月的学习，终于完成了我的第一个生成艺术作品，想和大家分享一下经验...",
    author: {
      name: "艺术家小王",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
    category: "作品分享",
    time: "4小时前",
    likes: 45,
    comments: 8,
    views: 230,
  },
  {
    id: 3,
    title: "Processing vs P5.js：如何选择？",
    content: "想开始学习创意编程，但不知道该选择 Processing 还是 P5.js，有经验的同学来分享一下吗？",
    author: {
      name: "选择困难",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    },
    category: "技术讨论",
    time: "1天前",
    likes: 56,
    comments: 23,
    views: 489,
  },
];

const hotTopics = [
  { id: 1, title: "生成艺术入门指南", discussions: 156 },
  { id: 2, title: "创意编程工具推荐", discussions: 89 },
  { id: 3, title: "项目作品展示", discussions: 78 },
  { id: 4, title: "编程艺术理论探讨", discussions: 67 },
  { id: 5, title: "技术难题解答", discussions: 45 },
];

const activeUsers = [
  {
    id: 1,
    name: "创意大师",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    contributions: 234,
  },
  {
    id: 2,
    name: "艺术编程",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    contributions: 186,
  },
  {
    id: 3,
    name: "代码艺术家",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    contributions: 156,
  },
  {
    id: 4,
    name: "创意实验室",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    contributions: 134,
  },
];