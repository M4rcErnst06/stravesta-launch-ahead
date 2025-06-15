
import React from "react";

/**
 * Diese Komponente erzeugt den Stravesta-typischen Hintergrund mit soften Teal-Blobs und Gradients,
 * wie er auf der Landing Page verwendet wird.
 * Sie kann auf allen Hauptseiten wiederverwendet werden.
 */
const StravestaBackground: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/30 pointer-events-none" />
  </div>
);

export default StravestaBackground;

