
import React from "react";

/**
 * Background-Komponente mit dezentem, professionellen Farbverlauf und soften Blobs.
 * Neue Farbtöne: Blau (#50b9df), Anthrazit (#223955), Soft-Teal (#7cc9ab)
 */
const StravestaBackground: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute top-10 left-10 w-96 h-96 bg-[#50b9df]/15 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7cc9ab]/15 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#223955]/10 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#e9f6fb]/70 via-transparent to-[#223955]/50 pointer-events-none" />
  </div>
);

export default StravestaBackground;
