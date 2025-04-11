import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Rocket,
  Palette,
  BookOpen,
  Library,
  Laptop,
  FileCode,
  Compass,
  Lightbulb,
  Users,
  ArrowRight,
  Box,
  Cpu,
  Gamepad2,
  Shapes,
  Sparkles,
  Zap,
  ChevronRight,
  Brain,
  Camera,
  Globe,
  BookOpenCheck,
  Settings
} from "lucide-react";

export function HomePage() {
  const advancedSectionRef = useRef<HTMLElement>(null);
  const basicSectionRef = useRef<HTMLElement>(null);
  const webSectionRef = useRef<HTMLElement>(null);

  const scrollToAdvanced = () => {
    advancedSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBasic = () => {
    basicSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWeb = () => {
    webSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-muted/30">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            探索创意编程的世界
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            发现最佳的创意编程课程、工具和资源，开启你的创意编程之旅
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/courses">
                浏览分类
                <Rocket className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link to="/projects">
                项目创意
                <Laptop className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Creation Guide */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">创作生态</h2>
        <p className="text-muted-foreground mb-8">深入了解创意编程生态环境</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={scrollToBasic}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                基础知识入门教程
              </CardTitle>
              <CardDescription>
                创意编程新手的起步指南和学习路径
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={scrollToWeb}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                创意编程技术
              </CardTitle>
              <CardDescription>
                精选优质的创意编程工具和开发环境
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={scrollToAdvanced}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                深度应用主题
              </CardTitle>
              <CardDescription>
                探索创意编程的前沿领域和专业应用
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Basic Knowledge and Tutorials */}
      <section ref={basicSectionRef} className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">基础知识和入门教程</h2>
            <p className="text-muted-foreground">帮你快速找到适合自己的学习路径</p>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link to="/courses">
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {basicCourses.map((course) => (
            <Card key={course.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {course.icon}
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" className="w-full gap-2" asChild>
                  <Link to={course.link}>
                    开始学习
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Web Creative Programming */}
      <section ref={webSectionRef} className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Web创意编程</h2>
            <p className="text-muted-foreground">使用现代Web技术进行创意编程，创建交互式作品和应用</p>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link to="/courses">
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {webCourses.map((course) => (
            <Card key={course.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {course.icon}
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" className="w-full gap-2" asChild>
                  <Link to={course.link}>
                    开始学习
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Desktop Creative Programming */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">桌面创意编程</h2>
            <p className="text-muted-foreground">使用专业的桌面创意编程工具，创作高性能的视觉艺术作品</p>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link to="/courses">
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {desktopCourses.map((course) => (
            <Card key={course.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {course.icon}
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" className="w-full gap-2" asChild>
                  <Link to={course.link}>
                    开始学习
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Advanced Topics */}
      <section ref={advancedSectionRef} className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">高级应用主题</h2>
            <p className="text-muted-foreground">探索创意编程的前沿领域和专业应用</p>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link to="/courses">
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedCourses.map((course) => (
            <Card key={course.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {course.icon}
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" className="w-full gap-2" asChild>
                  <Link to={course.link}>
                    开始学习
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const basicCourses = [
  {
    title: "创意编程导论",
    description: "创意编程的基本概念、历史和应用领域介绍",
    icon: <BookOpenCheck className="h-5 w-5 text-primary" />,
    tags: ["基础", "概念", "入门"],
    link: "/courses/creative-programming-intro"
  },
  {
    title: "创意编程工具与环境",
    description: "全面介绍各种创意编程工具、库和开发环境",
    icon: <Settings className="h-5 w-5 text-primary" />,
    tags: ["工具", "环境", "资源"],
    link: "/courses/creative-programming-tools"
  }
];

const webCourses = [
  {
    title: "P5.js基础入门",
    description: "从零开始学习P5.js，掌握创意编程基础",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    tags: ["P5.js", "JavaScript", "入门"],
    link: "/courses/p5js-basics"
  },
  {
    title: "Three.js 3D创作",
    description: "使用Three.js创建3D交互式网页作品",
    icon: <Box className="h-5 w-5 text-primary" />,
    tags: ["Three.js", "3D", "WebGL"],
    link: "/courses/threejs"
  },
  {
    title: "WebGL着色器艺术",
    description: "学习GLSL着色器创作视觉特效",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    tags: ["WebGL", "GLSL", "着色器"],
    link: "/courses/webgl-shaders"
  },
  {
    title: "Web音视频互动",
    description: "Web Audio API和Canvas创意音视频",
    icon: <Zap className="h-5 w-5 text-primary" />,
    tags: ["Web Audio", "Canvas", "互动"],
    link: "/courses/web-audio-visual"
  }
];

const desktopCourses = [
  {
    title: "Processing创意编程基础",
    description: "Processing创意编程基础知识与应用",
    icon: <Palette className="h-5 w-5 text-primary" />,
    tags: ["Processing", "Java", "基础"],
    link: "/courses/processing-basics"
  },
  {
    title: "openFrameworks进阶",
    description: "使用C++创建高性能创意应用",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    tags: ["openFrameworks", "C++", "进阶"],
    link: "/courses/openframeworks"
  },
  {
    title: "TouchDesigner入门",
    description: "节点式视觉编程与实时渲染",
    icon: <Shapes className="h-5 w-5 text-primary" />,
    tags: ["TouchDesigner", "节点编程", "实时"],
    link: "/courses/touchdesigner"
  }
];

const advancedCourses = [
  {
    title: "机器学习艺术",
    description: "将AI与创意编程结合创作",
    icon: <Lightbulb className="h-5 w-5 text-primary" />,
    tags: ["机器学习", "AI艺术", "创新"],
    link: "/courses/ml-art"
  },
  {
    title: "创意游戏设计",
    description: "实验性游戏与互动体验设计",
    icon: <Gamepad2 className="h-5 w-5 text-primary" />,
    tags: ["游戏设计", "互动", "体验"],
    link: "/courses/creative-games"
  },
  {
    title: "数据艺术创作",
    description: "数据可视化与艺术表达",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["数据", "可视化", "艺术"],
    link: "/courses/data-art"
  },
  {
    title: "计算机视觉艺术",
    description: "使用OpenCV和深度学习创作视觉互动作品",
    icon: <Camera className="h-5 w-5 text-primary" />,
    tags: ["计算机视觉", "深度学习", "互动"],
    link: "/courses/computer-vision-art"
  },
  {
    title: "神经网络生成艺术",
    description: "探索GAN和其他生成模型的艺术应用",
    icon: <Brain className="h-5 w-5 text-primary" />,
    tags: ["神经网络", "生成艺术", "AI"],
    link: "/courses/neural-art"
  },
  {
    title: "虚拟现实创作",
    description: "开发沉浸式VR/AR艺术体验",
    icon: <Globe className="h-5 w-5 text-primary" />,
    tags: ["VR", "AR", "沉浸式"],
    link: "/courses/vr-creation"
  }
];