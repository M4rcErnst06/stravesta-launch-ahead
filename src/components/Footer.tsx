
import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
const Footer = () => {
  
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/stravesta_official", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/stravesta/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-stravesta-navy/80 backdrop-blur-sm border-t border-stravesta-teal/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gradient mb-4">Stravesta</h3>
            <p className="text-stravesta-lightGray text-lg mb-6">
              For traders and investors who aim higher.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-stravesta-teal/10 text-stravesta-teal hover:bg-stravesta-teal hover:text-black transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-stravesta-teal/20 mb-6"></div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stravesta-lightGray">
            <p>&copy; 2024 Stravesta. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-stravesta-teal transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="hover:text-stravesta-teal transition-colors duration-200">
                Imprint
              </a>
              <a href="#" className="hover:text-stravesta-teal transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
