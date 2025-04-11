import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, Search } from "lucide-react";

export function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">文章合集</h1>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索项目..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="全部分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="tutorials">个人随笔</SelectItem>
                <SelectItem value="experiences">创作经验</SelectItem>
                <SelectItem value="showcase">工具推荐</SelectItem>
                <SelectItem value="technology">技术探讨</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Article Tabs */}
          <Tabs defaultValue="featured" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="featured">精选项目</TabsTrigger>
              <TabsTrigger value="latest">最新发布</TabsTrigger>
              <TabsTrigger value="popular">最受欢迎</TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <article key={article.id} className="group">
                    <Link to={`/articles/${article.id}`} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        {/* Article Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime} 分钟阅读
                          </div>
                        </div>

                        {/* Article Title and Description */}
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {article.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Article Image */}
                      <div className="md:w-1/3">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const articles = [
  {
    id: 1,
    title: "生成艺术创作经验分享：如何找到自己的艺术风格",
    description: "分享我在使用Processing进行生成艺术创作的心得体会，以及如何通过不断实验和探索发展自己独特的艺术风格。",
    author: "李四",
    date: "2024-03-14",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60",
    tags: ["生成艺术", "经验分享", "艺术创作"],
    category: "experiences"
  },
  {
    id: 2,
    title: "创意编程与数据可视化的完美结合",
    description: "探索如何将创意编程技术应用于数据可视化领域，创造既美观又富有信息量的视觉作品。",
    author: "王五",
    date: "2024-03-13",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    tags: ["数据可视化", "案例分析", "技术探讨"],
    category: "technology"
  },
  {
    id: 3,
    title: "从零开始的创意编程之旅：P5.js入门指南",
    description: "本文将带你一步步了解P5.js的基础概念，从安装配置到创建第一个互动画布，适合零基础的创意编程爱好者。",
    author: "张三",
    date: "2024-03-15",
    readTime: 15,
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&auto=format&fit=crop&q=60",
    tags: ["P5.js", "教程", "入门"],
    category: "tutorials"
  },
  {
    id: 4,
    title: "使用Three.js创建沉浸式3D网页体验",
    description: "深入探讨Three.js的高级特性，学习如何创建引人入胜的3D网页体验。",
    author: "赵六",
    date: "2024-03-12",
    readTime: 25,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60",
    tags: ["Three.js", "3D", "WebGL"],
    category: "tutorials"
  }
];