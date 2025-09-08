import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Shield, FileText, Users, Lock, Eye, Globe, Mail, MapPin, Phone, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import TopBar from "./homeComponents/TopBar"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"

export default function ProfessionalPrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState("overview")

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId)
  }

  const sections = [
    {
      id: "overview",
      title: "Privacy Policy Overview",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
            information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
            collection and use of information in accordance with this Privacy Policy. This policy applies to all users of our KYC verification platform.
          </p>
          <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg">
            <p className="text-gray-800 font-medium">
              Your trust is fundamental to our business. We are committed to protecting your personal information with the highest standards of security and transparency.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "definitions",
      title: "Interpretation and Definitions",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Interpretation</h4>
            <p className="text-gray-700 leading-relaxed">
              The words of which the initial letter is capitalized have meanings defined under the following conditions.
              The following definitions shall have the same meaning regardless of whether they appear in singular or in
              plural.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Definitions</h4>
            <p className="text-gray-700 mb-4">For the purposes of this Privacy Policy:</p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  term: "Account",
                  definition: "means a unique account created for You to access our Service or parts of our Service.",
                },
                {
                  term: "Company",
                  definition:
                    '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Bringmark Pvt. Ltd., operating Verify E-KYC services.',
                },
                {
                  term: "Service",
                  definition: "refers to the Verify E-KYC website and platform.",
                },
                {
                  term: "Personal Data",
                  definition: "is any information that relates to an identified or identifiable individual, including KYC documents.",
                },
                {
                  term: "KYC Data",
                  definition: "refers to identity verification documents and information collected for compliance purposes.",
                },
                {
                  term: "Device",
                  definition:
                    "means any device that can access the Service such as a computer, mobile phone or digital tablet.",
                },
                {
                  term: "Usage Data",
                  definition:
                    "refers to data collected automatically during use of our KYC verification services.",
                },
                {
                  term: "You/User",
                  definition:
                    "means the individual or entity accessing our KYC verification services.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-900">{item.term}:</span>{" "}
                  <span className="text-gray-700">{item.definition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-collection",
      title: "Data Collection & Processing",
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h4 className="text-amber-800 font-semibold mb-2">Important Notice</h4>
            <p className="text-amber-700">As a KYC verification service, we process sensitive personal and financial information. All data collection is performed in compliance with applicable data protection regulations.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Types of Data We Collect</h4>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h5 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-gray-600" />
                  KYC & Identity Verification Data
                </h5>
                <p className="text-gray-700 mb-3">
                  For identity verification and compliance purposes, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Government-issued ID documents (Passport, Driver's License, National ID)</li>
                  <li>Proof of address documents</li>
                  <li>Biometric data (facial recognition, fingerprints where applicable)</li>
                  <li>Financial documents for enhanced verification</li>
                  <li>Digital signatures and verification timestamps</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h5 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  Personal Information
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Full name and date of birth</li>
                  <li>Email address and phone number</li>
                  <li>Residential and business addresses</li>
                  <li>Occupation and employer information</li>
                  <li>Nationality and tax identification numbers</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h5 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-purple-600" />
                  Technical & Usage Data
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>IP addresses and device identifiers</li>
                  <li>Browser type and operating system</li>
                  <li>Session recordings for security purposes</li>
                  <li>Verification attempt logs and timestamps</li>
                  <li>Geolocation data for fraud prevention</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 mb-4">We use your personal data for the following purposes:</p>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Identity Verification",
                description: "To verify your identity and comply with KYC regulations and anti-money laundering requirements.",
                icon: "🛡️"
              },
              {
                title: "Service Delivery",
                description: "To provide and maintain our KYC verification services and process your verification requests.",
                icon: "⚡"
              },
              {
                title: "Compliance & Legal",
                description: "To meet regulatory requirements and assist law enforcement agencies when legally obligated.",
                icon: "⚖️"
              },
              {
                title: "Fraud Prevention",
                description: "To detect and prevent fraudulent activities, identity theft, and other security threats.",
                icon: "🔒"
              },
              {
                title: "Customer Support",
                description: "To respond to your inquiries, provide technical support, and resolve service issues.",
                icon: "💬"
              },
              {
                title: "Service Improvement",
                description: "To analyze usage patterns and improve our verification processes and user experience.",
                icon: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">{item.title}</h5>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="text-red-800 font-semibold mb-2">Data Sharing Limitations</h4>
            <p className="text-red-700 text-sm">
              We do not sell your personal data to third parties. Sharing is limited to authorized service providers, regulatory compliance, and legal requirements only.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "Data Security & Protection",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="text-green-800 font-semibold mb-2">Enterprise-Grade Security</h4>
            <p className="text-green-700">We implement bank-level security measures to protect your sensitive information throughout the verification process.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Technical Safeguards</h4>
              <ul className="space-y-2">
                {[
                  "256-bit SSL/TLS encryption in transit",
                  "AES-256 encryption at rest",
                  "Multi-factor authentication",
                  "Regular security audits and penetration testing",
                  "SOC 2 Type II compliance",
                  "GDPR and CCPA compliance measures"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Operational Security</h4>
              <ul className="space-y-2">
                {[
                  "Access controls and role-based permissions",
                  "Employee background checks and training",
                  "24/7 security monitoring and incident response",
                  "Secure data centers with physical access controls",
                  "Regular data backups and disaster recovery",
                  "Vendor security assessments"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="text-yellow-800 font-semibold mb-2">Security Incident Response</h4>
            <p className="text-yellow-700 text-sm">
              In the unlikely event of a security breach, we will notify affected users within 72 hours and work with relevant authorities to minimize impact.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "user-rights",
      title: "Your Privacy Rights",
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 mb-4">You have the following rights regarding your personal data:</p>

          <div className="space-y-4">
            {[
              {
                title: "Right to Access",
                description: "Request copies of your personal data and KYC information we hold about you.",
                action: "Submit a data access request through our support portal."
              },
              {
                title: "Right to Rectification",
                description: "Request correction of inaccurate or incomplete personal information.",
                action: "Contact our support team with documentation of correct information."
              },
              {
                title: "Right to Erasure",
                description: "Request deletion of your personal data, subject to legal retention requirements.",
                action: "Submit a deletion request (note: some data must be retained for compliance)."
              },
              {
                title: "Right to Data Portability",
                description: "Receive your personal data in a structured, machine-readable format.",
                action: "Request data export through your account settings or support."
              },
              {
                title: "Right to Object",
                description: "Object to processing of your personal data for direct marketing purposes.",
                action: "Opt-out through account preferences or email unsubscribe links."
              },
              {
                title: "Right to Restrict Processing",
                description: "Request limitation of processing in certain circumstances.",
                action: "Contact our Data Protection Officer with your specific request."
              }
            ].map((right, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <h5 className="font-semibold text-gray-800 mb-2">{right.title}</h5>
                <p className="text-gray-700 mb-3">{right.description}</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <span className="font-medium text-gray-800">How to exercise: </span>
                  <span className="text-gray-700">{right.action}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Data Retention Policy</h4>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <h5 className="font-medium mb-2 text-gray-300">KYC Documents:</h5>
                <p className="text-gray-400">Retained for 5 years after account closure as per regulatory requirements</p>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-gray-300">Transaction Logs:</h5>
                <p className="text-gray-400">Retained for 7 years for compliance and audit purposes</p>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-gray-300">Marketing Data:</h5>
                <p className="text-gray-400">Retained until you opt-out or withdraw consent</p>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-gray-300">Support Records:</h5>
                <p className="text-gray-400">Retained for 3 years for service quality purposes</p>
              </div>
            </div>
          </div>
        </div>
      ),
    }
  ]

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <>
    <TopBar/>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
  

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Privacy & Data Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-6">
              We are committed to protecting your privacy and securing your personal information with the highest standards of care and transparency.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>Full Transparency</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="shadow-lg border border-gray-200 overflow-hidden bg-white">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {section.id === "overview" && "Essential information about our privacy practices"}
                          {section.id === "definitions" && "Key terms and their meanings"}
                          {section.id === "data-collection" && "What information we collect and why"}
                          {section.id === "data-usage" && "How we use your personal information"}
                          {section.id === "data-security" && "Our commitment to protecting your data"}
                          {section.id === "user-rights" && "Your rights and how to exercise them"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedSection === section.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === section.id ? "auto" : 0,
                    opacity: expandedSection === section.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-gray-200 pt-6">{section.content}</div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact & Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="shadow-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gray-100 rounded-full p-3 mb-4">
                  <Mail className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help with Privacy?</h3>
                <p className="text-gray-600">
                  Our Data Protection Officer and support team are here to assist you with any privacy-related questions or requests.
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <Building2 className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h4>
                  <p className="text-gray-600 text-sm mb-3">For privacy-specific inquiries and data subject requests</p>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    support@verifyekyc.com
                  </button>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-green-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">Support Hotline</h4>
                  <p className="text-gray-600 text-sm mb-3">24/7 customer support for urgent privacy concerns</p>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    +91-7982981354
                  </button>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">Corporate Office</h4>
                  <p className="text-gray-600 text-sm mb-3">Visit us for in-person consultations</p>
                  <p className="text-purple-600 text-sm font-medium">
                    Dwarka sector 19, New Delhi 110071
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-900 rounded-lg text-center">
                <p className="text-white font-medium mb-2">Regulatory Compliance</p>
                <p className="text-gray-400 text-sm">
                  This privacy policy complies with GDPR, CCPA, and Indian Personal Data Protection regulations.
                  We are committed to maintaining the highest standards of data protection and privacy rights.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>

  )
}