import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Imprint = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Legal Notice (Imprint)
            </h1>
            <p className="text-xl text-stravesta-lightGray">
              Legal information according to applicable laws
            </p>
          </div>

          {/* Content */}
          <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
            <div className="prose prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
                
                <div className="bg-stravesta-dark/50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-stravesta-teal mb-4">Stravesta</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Registered Address</h4>
                      <p className="text-stravesta-lightGray">
                        [Company Address]<br/>
                        [City, Postal Code]<br/>
                        [Country]
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Contact Details</h4>
                      <p className="text-stravesta-lightGray">
                        <strong>Phone:</strong> [Phone Number]<br/>
                        <strong>Email:</strong> contact@stravesta.com<br/>
                        <strong>Website:</strong> www.stravesta.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-stravesta-dark/50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Business Registration</h4>
                  <p className="text-stravesta-lightGray">
                    <strong>Registration Number:</strong> [Registration Number]<br/>
                    <strong>Registered at:</strong> [Court/Authority]<br/>
                    <strong>VAT ID:</strong> [VAT Number]
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Responsible for Content</h2>
                <div className="bg-stravesta-dark/50 rounded-lg p-6">
                  <p className="text-stravesta-lightGray">
                    <strong>Managing Director:</strong> [Name]<br/>
                    <strong>Email:</strong> contact@stravesta.com
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Regulatory Information</h2>
                <p className="text-stravesta-lightGray mb-4">
                  Stravesta provides trading analytics and educational content. We do not provide investment advice or financial services requiring specific licenses. Our platform is designed for informational and educational purposes.
                </p>
                
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-orange-300 font-semibold mb-2">⚠️ Important Disclaimer</p>
                  <p className="text-stravesta-lightGray text-sm">
                    Trading and investing in financial markets involves substantial risk of loss and is not suitable for all investors. Past performance does not guarantee future results. Please consider your investment objectives, risk tolerance, and financial situation before making any investment decisions.
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-stravesta-lightGray mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images, software, and design, is the property of Stravesta or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                </p>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">Trademark Information</h3>
                <p className="text-stravesta-lightGray mb-4">
                  "Stravesta" and the Stravesta logo are trademarks of Stravesta. All other trademarks mentioned on this website are the property of their respective owners.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Liability Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">Content Accuracy</h3>
                <p className="text-stravesta-lightGray mb-4">
                  While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or suitability of the information contained on this website for any purpose.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">External Links</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or policies of these external sites. Links to third-party sites do not constitute an endorsement of their content or services.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">Technical Availability</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We endeavor to maintain the availability of our website but cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our service at any time without notice.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Data Protection Officer</h2>
                <div className="bg-stravesta-dark/50 rounded-lg p-6">
                  <p className="text-stravesta-lightGray">
                    For data protection inquiries, please contact our Data Protection Officer:<br/>
                    <strong>Email:</strong> contact@stravesta.com<br/>
                    <strong>Address:</strong> [DPO Address if different from company address]
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">Governing Law</h3>
                <p className="text-stravesta-lightGray mb-4">
                  This legal notice and your use of our website are governed by the laws of [Jurisdiction], without regard to conflict of law provisions.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">EU Online Dispute Resolution</h3>
                <p className="text-stravesta-lightGray mb-4">
                  The European Commission provides a platform for online dispute resolution which you can access at: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-stravesta-teal hover:underline ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Professional Liability Insurance</h2>
                <div className="bg-stravesta-dark/50 rounded-lg p-6">
                  <p className="text-stravesta-lightGray">
                    <strong>Insurance Provider:</strong> [Insurance Company Name]<br/>
                    <strong>Coverage Amount:</strong> [Amount]<br/>
                    <strong>Geographic Coverage:</strong> [Coverage Area]
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Technical Implementation</h2>
                <p className="text-stravesta-lightGray mb-4">
                  <strong>Website Development:</strong> Built with modern web technologies<br/>
                  <strong>Hosting:</strong> Secure cloud infrastructure<br/>
                  <strong>SSL Certificate:</strong> Extended validation certificate for secure connections
                </p>
              </section>

              <div className="bg-stravesta-teal/10 border border-stravesta-teal/30 rounded-lg p-6 mt-8">
                <p className="text-stravesta-teal font-semibold mb-2">Last Updated</p>
                <p className="text-stravesta-lightGray">
                  This legal notice was last updated on January 25, 2025. We reserve the right to update this information as necessary to comply with applicable laws and regulations.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Imprint;