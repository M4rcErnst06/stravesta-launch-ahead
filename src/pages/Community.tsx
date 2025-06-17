
import React from 'react';
import Navigation from '@/components/Navigation';
import { Users, MessageCircle, Trophy, Heart } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Community
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Werde Teil unserer wachsenden Trader-Community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20">
            <Users className="h-12 w-12 text-stravesta-teal mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Discord Community</h3>
            <p className="text-stravesta-lightGray mb-4">
              Tausche dich mit anderen Tradern aus und erhalte Support
            </p>
            <a 
              href="https://discord.gg/eNTjJFJg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-stravesta-teal hover:text-stravesta-teal/80 transition-colors"
            >
              Jetzt beitreten →
            </a>
          </div>

          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20">
            <MessageCircle className="h-12 w-12 text-stravesta-teal mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Telegram Gruppe</h3>
            <p className="text-stravesta-lightGray mb-4">
              Schnelle Updates und direkter Austausch
            </p>
            <a 
              href="https://t.me/stravesta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-stravesta-teal hover:text-stravesta-teal/80 transition-colors"
            >
              Jetzt beitreten →
            </a>
          </div>

          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20">
            <Trophy className="h-12 w-12 text-stravesta-teal mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Leaderboards</h3>
            <p className="text-stravesta-lightGray mb-4">
              Vergleiche deine Performance mit anderen Tradern
            </p>
            <span className="text-stravesta-lightGray text-sm">Bald verfügbar</span>
          </div>

          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20">
            <Heart className="h-12 w-12 text-stravesta-teal mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Beta-Tester</h3>
            <p className="text-stravesta-lightGray mb-4">
              500+ Trader vertrauen bereits auf Stravesta
            </p>
            <span className="text-stravesta-teal text-sm font-medium">Du bist dabei!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
