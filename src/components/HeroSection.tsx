
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Zap, Rocket } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
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
    <section className="min-h-screen bg-stravesta-dark bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-stravesta-teal" />
            <span className="text-2xl font-bold text-gradient">Stravesta</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold">
                Anmelden
              </Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stravesta-teal/10 border border-stravesta-teal/20 mb-8">
            <Star className="h-4 w-4 text-stravesta-teal mr-2" />
            <span className="text-sm font-medium text-stravesta-teal">Beta verfügbar</span>
            <span className="ml-2 text-xs text-stravesta-lightGray">• Limitierte Plätze</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Trading mit</span>
            <br />
            <span className="text-gradient">KI-Power</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stravesta-lightGray mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutioniere dein Trading mit automatischer Setup-Erkennung, 
            personalisierten AI-Bots und intelligenter Community.
          </p>
          
          {/* Value Proposition */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              AI-Setup-Erkennung
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              24/7 Marktüberwachung
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              Trading-Journal
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              Community & Coaching
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg"
              >
                Jetzt Beta-Zugang sichern
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Demo ansehen
            </Button>
          </div>

          {/* Beta Access Notification */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-2xl p-6 border border-stravesta-teal/20 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-stravesta-teal" />
              <h3 className="text-xl font-bold text-white">Beta-Zugang aktiv</h3>
            </div>
            <p className="text-stravesta-lightGray mb-6">
              Sie haben frühen Zugang zu Stravesta! Weitere Tools werden kontinuierlich freigeschaltet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleFeedbackClick}
                className="bg-stravesta-teal text-black font-semibold border-none hover:bg-stravesta-teal/90"
              > 
                Feedback geben
              </Button>
              <Button 
                onClick={handleRoadmapClick}
                className="bg-stravesta-teal text-black font-semibold border-none hover:bg-stravesta-teal/90"
              >
                Roadmap ansehen
              </Button>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            <EmailSubscribeForm />
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-stravesta-lightGray mb-4">Vertraut von Beta-Testern weltweit</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-stravesta-lightGray font-medium">500+ Beta-Tester</div>
              <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
              <div className="text-stravesta-lightGray font-medium">95% Setup-Genauigkeit</div>
              <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
              <div className="text-stravesta-lightGray font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </section>
  );
};

export default HeroSection;
