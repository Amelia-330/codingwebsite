import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  FileCode,
  Palette,
  Lightbulb,
  BookOpenCheck,
  ChevronRight,
  Code,
  Box,
  Cpu,
  Shapes,
  Sparkles,
  Zap,
  Brain,
  Camera,
  Globe,
  Gamepad2
} from "lucide-react";

export function CourseDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  // Find current category and course
  const currentCategory = courseCategories.find(category => 
    category.courses.some(c => c.link === location.pathname)
  );
  const currentCourse = currentCategory?.courses.find(c => 
    c.link === location.pathname
  );

  // Find course details
  const course = courses.find(c => c.link === location.pathname);

  if (!course) {
    return <div className="container mx-auto px-4 py-8">课程不存在</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-80 border-r bg-background">
        <div className="sticky top-[4rem] h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Course Categories */}
            <div className="space-y-4">
              {courseCategories.map((category) => (
                <div key={category.title} className="space-y-2">
                  <h3 className={`font-semibold flex items-center gap-2 ${
                    currentCategory?.title === category.title ? 'text-primary' : ''
                  }`}>
                    {category.icon}
                    {category.title}
                  </h3>
                  <ul className="space-y-1 pl-6">
                    {category.courses.map((c) => (
                      <li key={c.title}>
                        <Link
                          to={c.link}
                          className={`text-sm transition-colors block py-1 ${
                            location.pathname === c.link 
                              ? 'text-primary font-medium' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">首页</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/courses" className="hover:text-foreground transition-colors">课程</Link>
              {currentCategory && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-primary">{currentCategory.title}</span>
                </>
              )}
              {currentCourse && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-primary">{currentCourse.title}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="flex flex-wrap gap-4 md:gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{course.students} 名学员</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">视频教学</h2>
            <div className="aspect-video bg-black rounded-lg mb-4">
              {/* Video player placeholder */}
            </div>
          </div>

          {/* Course Description */}
          <div className="mb-8" id="overview">
            <h2 className="text-xl font-bold mb-4">概述</h2>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          {/* Course Content */}
          <div className="space-y-8" id="curriculum">
            {course.curriculum.map((week, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4">第 {index + 1} 周：{week.title}</h3>
                <ul className="space-y-3">
                  {week.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex gap-3 items-center p-3 rounded-lg bg-muted/50">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-64 border-l bg-background">
        <div className="sticky top-[4rem] h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <h3 className="font-medium mb-4">本页目录</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#overview" className="text-muted-foreground hover:text-foreground">课程简介</a>
              </li>
              <li>
                <a href="#overview" className="text-muted-foreground hover:text-foreground">概述</a>
              </li>
              <li>
                <a href="#curriculum" className="text-muted-foreground hover:text-foreground">教程分析</a>
              </li>
              <li>
                <a href="#objectives" className="text-muted-foreground hover:text-foreground">学习目标</a>
              </li>
              <li>
                <a href="#methods" className="text-muted-foreground hover:text-foreground">学习方式</a>
              </li>
              <li>
                <a href="#outcomes" className="text-muted-foreground hover:text-foreground">学习成果</a>
              </li>
              <li>
                <a href="#supplements" className="text-muted-foreground hover:text-foreground">教程相关补充</a>
              </li>
              <li>
                <a href="#notes" className="text-muted-foreground hover:text-foreground">补充说明</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const courseCategories = [
  {
    title: "基础知识和入门教程",
    icon: <BookOpenCheck className="h-4 w-4" />,
    courses: [
      { title: "创意编程导论", link: "/courses/creative-programming-intro" },
      { title: "创意编程工具与环境", link: "/courses/creative-programming-tools" },
    ]
  },
  {
    title: "Web创意编程",
    icon: <FileCode className="h-4 w-4" />,
    courses: [
      { title: "P5.js基础入门", link: "/courses/p5js-basics" },
      { title: "Three.js 3D创作", link: "/courses/threejs" },
      { title: "WebGL着色器艺术", link: "/courses/webgl-shaders" },
      { title: "Web音视频互动", link: "/courses/web-audio-visual" },
    ]
  },
  {
    title: "桌面创意编程",
    icon: <Palette className="h-4 w-4" />,
    courses: [
      { title: "Processing创意编程基础", link: "/courses/processing-basics" },
      { title: "openFrameworks进阶", link: "/courses/openframeworks" },
      { title: "TouchDesigner入门", link: "/courses/touchdesigner" },
    ]
  },
  {
    title: "高级应用主题",
    icon: <Lightbulb className="h-4 w-4" />,
    courses: [
      { title: "机器学习艺术", link: "/courses/ml-art" },
      { title: "创意游戏设计", link: "/courses/creative-games" },
      { title: "数据艺术创作", link: "/courses/data-art" },
      { title: "计算机视觉艺术", link: "/courses/computer-vision-art" },
      { title: "神经网络生成艺术", link: "/courses/neural-art" },
      { title: "虚拟现实创作", link: "/courses/vr-creation" },
    ]
  }
];

const courses = [
  {
    title: "创意编程导论",
    link: "/courses/creative-programming-intro",
    description: "探索创意编程的基本概念、历史发展和应用领域，为后续的深入学习打下坚实基础。",
    duration: "4周课程",
    level: "入门",
    students: 2156,
    curriculum: [
      {
        title: "创意编程概述",
        topics: [
          "什么是创意编程",
          "创意编程的历史发展",
          "创意编程的应用领域",
          "著名艺术家和作品赏析"
        ]
      },
      {
        title: "编程思维基础",
        topics: [
          "算法思维入门",
          "创意与逻辑的结合",
          "数字艺术基础",
          "交互设计原则"
        ]
      }
    ]
  },
  {
    title: "P5.js基础入门",
    link: "/courses/p5js-basics",
    description: "学习使用P5.js创建交互式图形和动画，掌握创意编程的基础知识和技能。",
    duration: "6周课程",
    level: "入门",
    students: 1823,
    curriculum: [
      {
        title: "P5.js基础",
        topics: [
          "开发环境搭建",
          "画布和坐标系统",
          "基本图形绘制",
          "颜色和样式"
        ]
      },
      {
        title: "动画与交互",
        topics: [
          "动画基础原理",
          "鼠标和键盘交互",
          "条件和循环应用",
          "简单粒子系统"
        ]
      }
    ]
  },
  {
    title: "Processing创意编程基础",
    link: "/courses/processing-basics",
    description: "通过Processing学习创意编程的核心概念和技术，创建视觉艺术作品。",
    duration: "8周课程",
    level: "入门",
    students: 1234,
    curriculum: [
      {
        title: "认识 Processing",
        topics: [
          "Processing 简介和开发环境搭建",
          "基本图形绘制",
          "颜色和形状",
          "坐标系统和变换"
        ]
      },
      {
        title: "动画基础",
        topics: [
          "变量和动态效果",
          "使用循环创建图案",
          "鼠标和键盘交互",
          "简单动画原理"
        ]
      },
      {
        title: "程序流程控制",
        topics: [
          "条件语句和分支结构",
          "多重循环应用",
          "函数的定义和调用",
          "模块化程序设计"
        ]
      },
      {
        title: "面向对象编程",
        topics: [
          "类和对象的概念",
          "属性和方法",
          "对象交互",
          "粒子系统基础"
        ]
      }
    ]
  },
  {
    title: "Three.js 3D创作",
    link: "/courses/threejs",
    description: "深入学习Three.js，掌握3D图形编程和WebGL技术，创建沉浸式的Web 3D体验。",
    duration: "10周课程",
    level: "进阶",
    students: 986,
    curriculum: [
      {
        title: "Three.js基础",
        topics: [
          "3D场景创建",
          "相机和光照系统",
          "几何体和材质",
          "纹理和着色器"
        ]
      },
      {
        title: "高级特效",
        topics: [
          "后期处理效果",
          "粒子系统",
          "物理引擎集成",
          "性能优化"
        ]
      }
    ]
  },
  {
    title: "机器学习艺术",
    link: "/courses/ml-art",
    description: "探索机器学习在艺术创作中的应用，使用AI技术创造独特的艺术作品。",
    duration: "12周课程",
    level: "高级",
    students: 645,
    curriculum: [
      {
        title: "机器学习基础",
        topics: [
          "神经网络入门",
          "数据处理和训练",
          "模型选择和优化",
          "创意应用实践"
        ]
      },
      {
        title: "艺术生成",
        topics: [
          "风格迁移技术",
          "GAN创作实践",
          "交互式AI艺术",
          "项目实战"
        ]
      }
    ]
  }
];