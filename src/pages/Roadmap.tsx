
import React from "react";

const roadmapItems = [
  {
    title: "Trading Bot Integration",
    description: "Automatisiere deine Trades mit anpassbaren Strategien.",
    status: "in Entwicklung",
  },
  {
    title: "Portfolio Analyse",
    description: "Tiefgehende Analyse deiner Performance & Assets.",
    status: "geplant",
  },
  {
    title: "Community Chat",
    description: "Direkter Austausch mit anderen Tradern in Echtzeit.",
    status: "verfügbar",
  },
  // Weitere Roadmap-Punkte nach Bedarf hier ergänzen
];

const statusColor = (status: string) => {
  if (status === "verfügbar") return "text-green-500";
  if (status === "in Entwicklung") return "text-yellow-400";
  return "text-stravesta-lightGray";
};

const Roadmap: React.FC = () => (
  <div className="container mx-auto px-4 py-12 min-h-screen bg-stravesta-dark">
    <h1 className="text-4xl font-bold text-white mb-8">Stravesta Roadmap</h1>
    <div className="space-y-6">
      {roadmapItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-stravesta-navy/60 border border-stravesta-teal/20 rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl text-white font-semibold">{item.title}</h2>
            <span className={`text-sm font-medium ${statusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
          <p className="text-stravesta-lightGray">{item.description}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 text-stravesta-lightGray text-sm opacity-70">
      Hinweis: Die Roadmap wird laufend ergänzt. Deine Wünsche? Nutze das Feedback-Formular!
    </div>
  </div>
);

export default Roadmap;
