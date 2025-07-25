import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-stravesta-lightGray">
              Effective Date: January 25, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
            <div className="prose prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-stravesta-lightGray mb-4">
                  Welcome to Stravesta ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our trading analytics services.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">2.1 Personal Information</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We may collect personally identifiable information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Register for an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our support channels</li>
                  <li>Participate in surveys or feedback forms</li>
                </ul>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">2.2 Trading Data</h3>
                <p className="text-stravesta-lightGray mb-4">
                  When you use our trading analytics services, we may collect:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Trading performance data</li>
                  <li>Portfolio information</li>
                  <li>Trading preferences and settings</li>
                  <li>Market analysis data</li>
                </ul>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">2.3 Technical Information</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We automatically collect certain technical information when you visit our website:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Provide and maintain our trading analytics services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Send you important updates and communications</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure the security and integrity of our platform</li>
                  <li>Comply with legal obligations and regulations</li>
                  <li>Provide customer support and respond to inquiries</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in our operations</li>
                  <li>In connection with a business merger, acquisition, or sale</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We implement industry-standard security measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data storage and backup procedures</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
                <p className="text-stravesta-lightGray mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Access: Request copies of your personal data</li>
                  <li>Rectification: Request correction of inaccurate data</li>
                  <li>Erasure: Request deletion of your personal data</li>
                  <li>Portability: Request transfer of your data</li>
                  <li>Objection: Object to processing of your data</li>
                  <li>Restriction: Request limitation of processing</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. For more information about cookies, please see our Cookie Policy.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                <p className="text-stravesta-lightGray mb-4">
                  Your information may be transferred to and processed in countries outside of your residence. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                <p className="text-stravesta-lightGray mb-4">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Effective Date" above. Your continued use of our services after any changes constitutes your acceptance of the new Privacy Policy.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                <p className="text-stravesta-lightGray mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-stravesta-dark/50 rounded-lg p-4 mt-4">
                  <p className="text-white font-semibold">Stravesta</p>
                  <p className="text-stravesta-lightGray">Email: privacy@stravesta.com</p>
                  <p className="text-stravesta-lightGray">Website: www.stravesta.com</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;