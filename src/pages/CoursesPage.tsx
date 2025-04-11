import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Box, Code, Cpu, FileCode, Gamepad2, Lightbulb, Palette, Shapes, Sparkles, Zap, ArrowRight, ChevronRight } from "lucide-react";

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Featured Resources Carousel */}
        <section className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl" />
          <div className="relative bg-muted/30 rounded-xl p-8 backdrop-blur-sm border border-primary/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                每日精选资源
              </h2>
              <Button variant="ghost" size="sm" className="group">
                <span className="mr-2 group-hover:mr-3 transition-all">查看全部</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredResources.map((resource, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-foreground transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-white/80 line-clamp-2 text-sm group-hover:text-white transition-colors">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                      <CardContent className="p-4 flex justify-end bg-gradient-to-b from-background/50 to-background group-hover:from-primary/5 group-hover:to-primary/10 transition-colors">
                        <Button 
                          asChild 
                          variant="ghost" 
                          className="group/btn gap-2 hover:gap-3 transition-all hover:text-primary"
                        >
                          <Link to={resource.link}>
                            了解更多
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 hover:scale-110 transition-transform" />
              <CarouselNext className="right-2 hover:scale-110 transition-transform" />
            </Carousel>
          </div>
        </section>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">探索所有课程</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Input
            placeholder="搜索课程..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="web">Web创意编程</SelectItem>
              <SelectItem value="desktop">桌面创意编程</SelectItem>
              <SelectItem value="advanced">高级主题</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择难度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部难度</SelectItem>
              <SelectItem value="beginner">入门</SelectItem>
              <SelectItem value="intermediate">进阶</SelectItem>
              <SelectItem value="advanced">高级</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="featured" className="mb-8">
          <TabsList>
            <TabsTrigger value="featured">精选课程</TabsTrigger>
            <TabsTrigger value="newest">最新上线</TabsTrigger>
            <TabsTrigger value="popular">最受欢迎</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {course.icon}
                      <CardTitle>{course.title}</CardTitle>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <p>{course.duration}</p>
                          <p>{course.students} 名学员</p>
                        </div>
                        <Button asChild>
                          <Link to={course.courseLink}>查看详情</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const featuredResources = [
  {
    title: "创意编程入门指南",
    description: "从零开始学习创意编程的完整指南",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
    link: "/resources/creative-programming-guide"
  },
  {
    title: "数据可视化艺术",
    description: "探索数据可视化的艺术表现形式",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    link: "/resources/data-visualization-art"
  },
  {
    title: "生成艺术基础",
    description: "使用代码创造独特的艺术作品",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    link: "/resources/generative-art-basics"
  },
  {
    title: "互动装置设计",
    description: "创建引人入胜的互动体验",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    link: "/resources/interactive-installation"
  },
];

const courses = [
  // Web创意编程
  {
    id: 1,
    title: "P5.js基础入门",
    description: "从零开始学习P5.js，掌握创意编程基础知识和技能",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    category: "web",
    level: "beginner",
    duration: "4周课程",
    students: 1234,
    tags: ["P5.js", "JavaScript", "入门"],
    courseLink: "/courses/p5js-basics"
  },
  {
    id: 2,
    title: "Three.js 3D创作",
    description: "使用Three.js创建3D交互式网页作品",
    icon: <Box className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60",
    category: "web",
    level: "intermediate",
    duration: "6周课程",
    students: 856,
    tags: ["Three.js", "3D", "WebGL"],
    courseLink: "/courses/threejs"
  },
  {
    id: 3,
    title: "WebGL着色器艺术",
    description: "学习GLSL着色器创作视觉特效",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    category: "web",
    level: "advanced",
    duration: "8周课程",
    students: 543,
    tags: ["WebGL", "GLSL", "着色器"],
    courseLink: "/courses/webgl-shaders"
  },
  {
    id: 4,
    title: "Web音视频互动",
    description: "使用Web Audio API和Canvas创建创意音视频作品",
    icon: <Zap className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60",
    category: "web",
    level: "intermediate",
    duration: "6周课程",
    students: 678,
    tags: ["Web Audio", "Canvas", "互动"],
    courseLink: "/courses/web-audio-visual"
  },

  // 桌面创意编程
  {
    id: 5,
    title: "Processing创意编程基础",
    description: "Processing创意编程基础知识与应用",
    icon: <Palette className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&auto=format&fit=crop&q=60",
    category: "desktop",
    level: "beginner",
    duration: "8周课程",
    students: 1567,
    tags: ["Processing", "Java", "基础"],
    courseLink: "/courses/processing-basics"
  },
  {
    id: 6,
    title: "openFrameworks进阶",
    description: "使用C++创建高性能创意应用",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    category: "desktop",
    level: "advanced",
    duration: "12周课程",
    students: 432,
    tags: ["openFrameworks", "C++", "进阶"],
    courseLink: "/courses/openframeworks"
  },
  {
    id: 7,
    title: "TouchDesigner入门",
    description: "节点式视觉编程与实时渲染",
    icon: <Shapes className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    category: "desktop",
    level: "intermediate",
    duration: "8周课程",
    students: 789,
    tags: ["TouchDesigner", "节点编程", "实时"],
    courseLink: "/courses/touchdesigner"
  },

  // 高级主题
  {
    id: 8,
    title: "机器学习艺术",
    description: "将AI与创意编程结合创作",
    icon: <Lightbulb className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    category: "advanced",
    level: "advanced",
    duration: "10周课程",
    students: 345,
    tags: ["机器学习", "AI艺术", "创新"],
    courseLink: "/courses/ml-art"
  },
  {
    id: 9,
    title: "创意游戏设计",
    description: "实验性游戏与互动体验设计",
    icon: <Gamepad2 className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60",
    category: "advanced",
    level: "intermediate",
    duration: "8周课程",
    students: 567,
    tags: ["游戏设计", "互动", "体验"],
    courseLink: "/courses/creative-games"
  },
  {
    id: 10,
    title: "数据艺术创作",
    description: "数据可视化与艺术表达",
    icon: <Code className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    category: "advanced",
    level: "advanced",
    duration: "6周课程",
    students: 432,
    tags: ["数据", "可视化", "艺术"],
    courseLink: "/courses/data-art"
  },
];