import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { CoursesPage } from "@/pages/CoursesPage";
import { CourseDetailPage } from "@/pages/CourseDetailPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { AiTutorPage } from "@/pages/AiTutorPage";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/ai-tutor" element={<AiTutorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;