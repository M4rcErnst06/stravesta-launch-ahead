
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Rocket } from 'lucide-react';
import EmailSubscribeForm from './EmailSubscribeForm';
import FeedbackModal from './FeedbackModal';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    setFeedbackOpen(true);
  };

  const handleRoadmapClick = () => {
    navigate('/roadmap');
  };

  return (
    <section className="min-h-screen bg-stravesta-dark bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden flex items-center">
      <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stravesta-teal/10 border border-stravesta-teal/20 mb-8">
            <Star className="h-4 w-4 text-stravesta-teal mr-2" />
            <span className="text-sm font-medium text-stravesta-teal">Beta verfügbar</span>
            <span className="ml-2 text-xs text-stravesta-lightGray">• Limitierte Plätze</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Trading mit</span>
            <br />
            <span className="text-gradient">KI-Power</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto leading-relaxed">
            Revolutioniere dein Trading mit automatischer Setup-Erkennung, 
            personalisierten AI-Bots und intelligenter Community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg w-full sm:w-auto"
              >
                Jetzt Beta-Zugang sichern
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              className="bg-stravesta-teal/10 hover:bg-stravesta-teal/20 text-stravesta-teal border border-stravesta-teal/30 font-semibold px-8 py-4 text-lg w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Demo ansehen
            </Button>
          </div>

          {/* Beta Access Notification */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-stravesta-teal" />
              <h3 className="text-lg font-bold text-white">Beta-Zugang aktiv</h3>
            </div>
            <p className="text-stravesta-lightGray text-sm mb-4">
              Früher Zugang zu Stravesta mit kontinuierlichen Updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleFeedbackClick}
                size="sm"
                className="bg-stravesta-teal text-black font-semibold border-none hover:bg-stravesta-teal/90"
              > 
                Feedback geben
              </Button>
              <Button 
                onClick={handleRoadmapClick}
                size="sm"
                className="bg-stravesta-teal/10 text-stravesta-teal border border-stravesta-teal/30 hover:bg-stravesta-teal/20"
              >
                Roadmap ansehen
              </Button>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            <EmailSubscribeForm />
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </section>
  );
};

export default HeroSection;
