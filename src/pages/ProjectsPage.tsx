import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageSquare, Eye, Share2 } from "lucide-react";

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">创意项目解析</h1>
          <Button>分享我的项目</Button>
        </div>

        <div className="flex gap-4 mb-8">
          <Input
            placeholder="搜索项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="generative-art">生成艺术</SelectItem>
              <SelectItem value="interactive">互动装置</SelectItem>
              <SelectItem value="visualization">数据可视化</SelectItem>
              <SelectItem value="game">游戏设计</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="featured" className="mb-8">
          <TabsList>
            <TabsTrigger value="featured">精选项目</TabsTrigger>
            <TabsTrigger value="latest">最新发布</TabsTrigger>
            <TabsTrigger value="popular">最受欢迎</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group">
                  <CardHeader>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>by {project.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Heart className="h-4 w-4" />
                        {project.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {project.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "声音可视化装置",
    author: "张三",
    description: "通过麦克风采集声音，实时生成动态视觉效果",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=3569&auto=format&fit=crop",
    category: "interactive",
    tags: ["声音", "互动", "Processing"],
    likes: 156,
    comments: 32,
    views: 1890,
  },
  {
    id: 2,
    title: "城市数据流动",
    author: "李四",
    description: "基于城市交通数据的实时可视化项目",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=3687&auto=format&fit=crop",
    category: "visualization",
    tags: ["数据", "城市", "P5.js"],
    likes: 234,
    comments: 45,
    views: 2156,
  },
  {
    id: 3,
    title: "分形艺术生成器",
    author: "王五",
    description: "使用递归算法创建复杂的分形图案",
    image: "https://images.unsplash.com/photo-1637419450536-378d5457abb8?q=80&w=3540&auto=format&fit=crop",
    category: "generative-art",
    tags: ["分形", "算法", "JavaScript"],
    likes: 312,
    comments: 67,
    views: 3420,
  },
  {
    id: 4,
    title: "像素冒险游戏",
    author: "赵六",
    description: "复古风格的像素艺术游戏，融合现代游戏机制",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3540&auto=format&fit=crop",
    category: "game",
    tags: ["游戏", "像素艺术", "Unity"],
    likes: 189,
    comments: 28,
    views: 1567,
  }
];