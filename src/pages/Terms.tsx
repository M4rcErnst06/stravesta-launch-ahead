import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-stravesta-lightGray">
              Effective Date: January 25, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
            <div className="prose prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-stravesta-lightGray mb-4">
                  By accessing and using Stravesta's website and services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this Service.
                </p>
                
                <div className="bg-stravesta-teal/10 border border-stravesta-teal/30 rounded-lg p-4">
                  <p className="text-stravesta-teal font-semibold mb-2">Agreement to Terms</p>
                  <p className="text-stravesta-lightGray text-sm">
                    By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                
                <p className="text-stravesta-lightGray mb-4">
                  Stravesta provides trading analytics, educational content, and tools designed to help traders and investors make informed decisions. Our services include but are not limited to:
                </p>
                
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-6">
                  <li>Trading analytics and performance tracking</li>
                  <li>Market analysis tools and indicators</li>
                  <li>Educational content and resources</li>
                  <li>Portfolio management features</li>
                  <li>Real-time market data (where available)</li>
                  <li>Community features and discussions</li>
                </ul>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-orange-300 font-semibold mb-2">⚠️ Important Notice</p>
                  <p className="text-stravesta-lightGray text-sm">
                    Our services are for informational and educational purposes only. We do not provide investment advice, and our tools should not be construed as recommendations to buy or sell any financial instruments.
                  </p>
                </div>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Eligibility and Account Registration</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">3.1 Age Requirements</h3>
                <p className="text-stravesta-lightGray mb-4">
                  You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that you meet this age requirement.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">3.2 Account Information</h3>
                <p className="text-stravesta-lightGray mb-4">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as necessary</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">3.3 Account Termination</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">4.1 Permitted Uses</h3>
                <p className="text-stravesta-lightGray mb-4">
                  You may use our Service for legitimate trading analytics and educational purposes in compliance with all applicable laws and regulations.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">4.2 Prohibited Activities</h3>
                <p className="text-stravesta-lightGray mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-stravesta-lightGray mb-4">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction or ours</li>
                  <li>Transmit malicious code, viruses, or harmful content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the normal operation of our Service</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Share or distribute inappropriate content</li>
                  <li>Engage in market manipulation or fraudulent activities</li>
                  <li>Reverse engineer or attempt to extract our source code</li>
                  <li>Use automated systems to access our Service without permission</li>
                </ul>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">5.1 Our Content</h3>
                <p className="text-stravesta-lightGray mb-4">
                  All content, features, and functionality of our Service, including but not limited to text, graphics, logos, images, software, and design, are owned by Stravesta or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">5.2 User Content</h3>
                <p className="text-stravesta-lightGray mb-4">
                  By submitting content to our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display such content in connection with our Service.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">5.3 Trademark Policy</h3>
                <p className="text-stravesta-lightGray mb-4">
                  "Stravesta" and our logo are trademarks of Stravesta. You may not use our trademarks without our prior written consent.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Financial Disclaimers and Risk Warnings</h2>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-red-300 mb-3">⚠️ High Risk Warning</h3>
                  <p className="text-stravesta-lightGray mb-4">
                    Trading in financial markets involves substantial risk of loss and is not suitable for all investors. You should carefully consider your investment objectives, level of experience, and risk appetite before making any investment decisions.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">6.1 No Investment Advice</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Our Service provides educational content and analytical tools but does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any content as such.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">6.2 Past Performance</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Past performance is not indicative of future results. Any trading or investment results shown are for illustrative purposes only and should not be interpreted as typical.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">6.3 Market Data Accuracy</h3>
                <p className="text-stravesta-lightGray mb-4">
                  While we strive to provide accurate market data, we cannot guarantee the accuracy, completeness, or timeliness of any information provided through our Service.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Subscription and Payment Terms</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">7.1 Subscription Plans</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We offer various subscription plans with different features and pricing. Current plans and pricing are available on our website.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">7.2 Payment Processing</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Payments are processed by secure third-party payment providers. By subscribing, you authorize us to charge your chosen payment method for recurring subscription fees.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">7.3 Refund Policy</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Refunds are handled on a case-by-case basis. Please contact our support team for refund requests within 30 days of your subscription start date.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">7.4 Cancellation</h3>
                <p className="text-stravesta-lightGray mb-4">
                  You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Privacy and Data Protection</h2>
                <p className="text-stravesta-lightGray mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">8.1 Data Security</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3">Important Legal Notice</h3>
                  <p className="text-stravesta-lightGray mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, STRAVESTA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">9.1 Service Availability</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We do not guarantee that our Service will be available at all times. We may experience hardware, software, or other problems that require maintenance or updating.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">9.2 Trading Losses</h3>
                <p className="text-stravesta-lightGray mb-4">
                  We are not responsible for any trading losses you may incur while using our Service or following any information provided through our platform.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                <p className="text-stravesta-lightGray mb-4">
                  You agree to defend, indemnify, and hold harmless Stravesta and its affiliates, officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of our Service or violation of these Terms.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law and Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">11.1 Governing Law</h3>
                <p className="text-stravesta-lightGray mb-4">
                  These Terms shall be interpreted and governed by the laws of [Jurisdiction], without regard to conflict of law provisions.
                </p>

                <h3 className="text-xl font-semibold text-stravesta-teal mb-3">11.2 Dispute Resolution</h3>
                <p className="text-stravesta-lightGray mb-4">
                  Any disputes arising out of or relating to these Terms or our Service shall be resolved through binding arbitration or in the courts of [Jurisdiction].
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <p className="text-stravesta-lightGray mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Effective Date" above. Your continued use of our Service after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">13. Severability</h2>
                <p className="text-stravesta-lightGray mb-4">
                  If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
                </p>
              </section>

              <Separator className="my-6 bg-stravesta-teal/20" />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                <p className="text-stravesta-lightGray mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="bg-stravesta-dark/50 rounded-lg p-6">
                  <p className="text-white font-semibold mb-2">Stravesta Support</p>
                  <p className="text-stravesta-lightGray">
                    <strong>Email:</strong> contact@stravesta.com<br/>
                    <strong>Legal:</strong> contact@stravesta.com<br/>
                    <strong>Website:</strong> www.stravesta.com
                  </p>
                </div>
              </section>

              <div className="bg-stravesta-teal/10 border border-stravesta-teal/30 rounded-lg p-6 mt-8">
                <p className="text-stravesta-teal font-semibold mb-2">Acknowledgment</p>
                <p className="text-stravesta-lightGray">
                  By using our Service, you acknowledge that you have read these Terms of Service and agree to be bound by them. These Terms constitute the entire agreement between you and Stravesta regarding the use of our Service.
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

export default Terms;