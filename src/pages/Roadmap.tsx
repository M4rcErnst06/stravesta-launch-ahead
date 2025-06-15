
import React from "react";

const roadmapItems = [
  {
    title: "Trading Bot Integration",
    description: "Automatisiere deine Trades mit anpassbaren Strategien.",
    status: "in Entwicklung",
    date: "Q3 2024",
  },
  {
    title: "Portfolio Analyse",
    description: "Tiefgehende Analyse deiner Performance & Assets.",
    status: "geplant",
    date: "Ende 2024",
  },
  {
    title: "Community Chat",
    description: "Direkter Austausch mit anderen Tradern in Echtzeit.",
    status: "verfügbar",
    date: "Juni 2024",
  },
  // Weitere Roadmap-Punkte nach Bedarf hier ergänzen
];

const statusColor = (status: string) => {
  if (status === "verfügbar") return "bg-green-500";
  if (status === "in Entwicklung") return "bg-yellow-400";
  return "bg-stravesta-lightGray";
};

const Roadmap: React.FC = () => (
  <div className="container mx-auto px-4 py-12 min-h-screen bg-stravesta-dark">
    <h1 className="text-4xl font-bold text-white mb-8">Stravesta Roadmap</h1>
    <div className="relative pl-6 md:pl-10">
      <div className="absolute left-2 md:left-4 top-0 w-1 bg-stravesta-teal/40 h-full rounded-full"></div>
      <div className="space-y-10">
        {roadmapItems.map((item, idx) => (
          <div key={item.title} className="relative flex items-start animate-fade-in">
            {/* Timeline dot */}
            <span
              className={`
                absolute left-[-0.25rem] md:left-[-0.30rem]
                flex items-center justify-center
                w-5 h-5 rounded-full border-4 border-stravesta-dark 
                z-10
                ${statusColor(item.status)}
                shadow-lg
                transition-all duration-300
              `}
            ></span>
            {/* Timeline card */}
            <div className="ml-8 md:ml-12 flex-1">
              <div className="flex flex-col sm:flex-row items-baseline gap-2">
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <span className="text-xs font-medium text-stravesta-teal bg-stravesta-navy/70 px-2 py-1 rounded ml-0 sm:ml-3 capitalize">
                  {item.status}
                </span>
                <span className="text-xs text-stravesta-lightGray ml-0 sm:ml-3">{item.date}</span>
              </div>
              <p className="text-stravesta-lightGray mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-10 text-stravesta-lightGray text-sm opacity-70">
      Hinweis: Die Roadmap wird laufend ergänzt. Deine Wünsche? Nutze das Feedback-Formular!
    </div>
  </div>
);

export default Roadmap;
