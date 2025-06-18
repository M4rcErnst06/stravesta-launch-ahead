
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roadmapItems = [
  {
    title: "Trading Bot Integration",
    description: "Automatisiere deine Trades mit anpassbaren Strategien.",
    status: "in Entwicklung",
    date: "Q3 2024",
    step: 1,
  },
  {
    title: "Portfolio Analyse",
    description: "Tiefgehende Analyse deiner Performance & Assets.",
    status: "geplant",
    date: "Ende 2024",
    step: 2,
  },
  {
    title: "Community Chat",
    description: "Direkter Austausch mit anderen Tradern in Echtzeit.",
    status: "verfügbar",
    date: "Juni 2024",
    step: 3,
  },
  {
    title: "AI-Powered Alerts",
    description: "Intelligente Benachrichtigungen für Trading-Gelegenheiten.",
    status: "geplant",
    date: "Q1 2025",
    step: 4,
  },
  {
    title: "Mobile App",
    description: "Trading unterwegs mit der Stravesta Mobile App.",
    status: "geplant",
    date: "Q2 2025",
    step: 5,
  },
];

const statusColor = (status: string) => {
  if (status === "verfügbar") return "bg-green-500";
  if (status === "in Entwicklung") return "bg-stravesta-teal";
  return "bg-gray-500";
};

const getArrowColor = (index: number) => {
  // Use consistent teal gradient for all arrows
  return "bg-gradient-to-r from-stravesta-teal to-stravesta-teal/80";
};

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-stravesta-dark">
      <div className="flex items-center mb-12">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-stravesta-teal hover:text-stravesta-teal/80 hover:bg-stravesta-teal/10 p-2 mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-4xl font-bold text-white">Stravesta Roadmap</h1>
      </div>
      
      {/* Timeline Container */}
      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center min-w-max space-x-0">
          {roadmapItems.map((item, index) => (
            <div key={item.step} className="flex items-center">
              {/* Step Arrow */}
              <div className={`relative ${getArrowColor(index)} text-white px-8 py-4 clip-path-arrow min-w-[280px] shadow-lg`}>
                <div className="relative z-10">
                  <div className="text-lg font-bold mb-1">{item.title}</div>
                  <div className="text-sm opacity-90">{item.date}</div>
                </div>
                {/* Arrow point styling */}
                <div className="absolute right-0 top-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[32px] border-t-current border-b-[32px] border-b-current transform translate-x-full"></div>
              </div>
              
              {/* Connection line (except for last item) */}
              {index < roadmapItems.length - 1 && (
                <div className="w-8 h-1 bg-stravesta-teal/30"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Timeline dots and details */}
        <div className="flex items-start min-w-max space-x-0 mt-8">
          {roadmapItems.map((item, index) => (
            <div key={`details-${item.step}`} className="flex flex-col items-center min-w-[280px]">
              {/* Step number circle - unified color */}
              <div className="w-12 h-12 rounded-full bg-stravesta-teal flex items-center justify-center text-white font-bold text-lg shadow-lg mb-4">
                {item.step}
              </div>
              
              {/* Item details card */}
              <div className="bg-stravesta-navy/80 border border-stravesta-teal/20 rounded-lg p-4 max-w-[260px] shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${statusColor(item.status)}`}></span>
                  <span className="text-xs font-medium text-stravesta-teal capitalize">
                    {item.status}
                  </span>
                </div>
                <p className="text-stravesta-lightGray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-stravesta-lightGray text-sm opacity-70 text-center">
        Hinweis: Die Roadmap wird laufend ergänzt. Deine Wünsche? Nutze das Feedback-Formular!
      </div>
    </div>
  );
};

export default Roadmap;
