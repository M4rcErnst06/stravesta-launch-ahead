import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import Roadmap from "./pages/Roadmap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trading-journal" element={<TradingJournal />} />
          <Route path="/ai-setup-recognition" element={<AISetupRecognition />} />
          <Route path="/community-chat" element={<CommunityChat />} />
          <Route path="/economic-calendar" element={<EconomicCalendar />} />
          <Route path="/watchlist-management" element={<WatchlistManagement />} />
          <Route path="/backtesting-engine" element={<BacktestingEngine />} />
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
