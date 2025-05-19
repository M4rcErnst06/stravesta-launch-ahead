
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-stravesta-navy rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] bg-shine">
      <div className="text-stravesta-teal mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-stravesta-lightGray text-sm text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
