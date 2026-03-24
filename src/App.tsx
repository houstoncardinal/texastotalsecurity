import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const AlarmSystems = lazy(() => import("./pages/AlarmSystems"));
const SecurityCameras = lazy(() => import("./pages/SecurityCameras"));
const ResidentialSecurity = lazy(() => import("./pages/ResidentialSecurity"));
const CommercialSecurity = lazy(() => import("./pages/CommercialSecurity"));
const HOASecurity = lazy(() => import("./pages/HOASecurity"));
const MonitoringServices = lazy(() => import("./pages/MonitoringServices"));
const ServiceMaintenance = lazy(() => import("./pages/ServiceMaintenance"));
const IndustriesWeServe = lazy(() => import("./pages/IndustriesWeServe"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Contact = lazy(() => import("./pages/Contact"));
const FreeAnalysis = lazy(() => import("./pages/FreeAnalysis"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/alarm-systems" element={<AlarmSystems />} />
            <Route path="/security-cameras" element={<SecurityCameras />} />
            <Route path="/residential-security" element={<ResidentialSecurity />} />
            <Route path="/commercial-security" element={<CommercialSecurity />} />
            <Route path="/hoa-security" element={<HOASecurity />} />
            <Route path="/monitoring-services" element={<MonitoringServices />} />
            <Route path="/service-maintenance" element={<ServiceMaintenance />} />
            <Route path="/industries" element={<IndustriesWeServe />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-analysis" element={<FreeAnalysis />} />
            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleSlug" element={<BlogArticle />} />
            <Route path="/blog/category/:categorySlug" element={<BlogCategory />} />
            {/* City SEO Landing Pages */}
            <Route path="/:citySlug-security-systems" element={<CityLanding />} />
            <Route path="/:citySlug-security" element={<CityLanding />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
