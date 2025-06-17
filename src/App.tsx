
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import AIFeatures from "./pages/AIFeatures";
import AnalysisFeatures from "./pages/AnalysisFeatures";
import Integrations from "./pages/Integrations";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TradingJournal from "./pages/TradingJournal";
import AISetupRecognition from "./pages/AISetupRecognition";
import CommunityChat from "./pages/CommunityChat";
import EconomicCalendar from "./pages/EconomicCalendar";
import WatchlistManagement from "./pages/WatchlistManagement";
import BacktestingEngine from "./pages/BacktestingEngine";
import PortfolioAnalysis from "./pages/PortfolioAnalysis";
import Roadmap from "./pages/Roadmap";
import Community from "./pages/Community";
import About from "./pages/About";
import Stats from "./pages/Stats";
import Testimonials from "./pages/Testimonials";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/ai-features" element={<AIFeatures />} />
          <Route path="/analysis-features" element={<AnalysisFeatures />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trading-journal" element={<TradingJournal />} />
          <Route path="/ai-setup-recognition" element={<AISetupRecognition />} />
          <Route path="/community-chat" element={<CommunityChat />} />
          <Route path="/economic-calendar" element={<EconomicCalendar />} />
          <Route path="/watchlist-management" element={<WatchlistManagement />} />
          <Route path="/backtesting-engine" element={<BacktestingEngine />} />
          <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
