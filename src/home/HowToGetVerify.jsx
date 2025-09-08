"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Play, FileText, Shield, Clock, CheckCircle, User, CreditCard, Car, Vote, IdCard, Building, Banknote, Smartphone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"
import { useNavigate } from "react-router-dom"
import TopBar from "./homeComponents/TopBar"

// A reusable component for each verification step
const StepCard = ({ step, isExpanded, toggleSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white hover:shadow-xl transition-shadow"
    >
      <button
        onClick={() => toggleSection(step.id)}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-lg border border-teal-200">
              {step.index + 1}
            </div>
            <div className="flex items-center space-x-3 text-gray-900">
              <div className="text-teal-600">{step.icon}</div>
              <h2 className="text-xl font-semibold">{step.title}</h2>
            </div>
          </div>
          <div className="flex-shrink-0 text-gray-500">
            {isExpanded ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="px-6 pb-6 pt-0">
              <div className="border-t border-gray-200 pt-6">
                {step.content}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// A reusable component for the quick stats
const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center p-6 rounded-xl shadow-md border ${color.bg} ${color.border}`}
    >
      <div className={`text-4xl font-extrabold ${color.text} mb-2`}>{value}</div>
      <div className={`text-sm font-medium ${color.title}`}>{title}</div>
    </motion.div>
  );
};

export default function HowToVerifyPage() {
  const [expandedSection, setExpandedSection] = useState("start")
  const navigate = useNavigate()
  
  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const verificationSteps = [
    {
      id: "start",
      title: "Start Verification",
      icon: <Play className="w-5 h-5" />,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Begin your KYC journey by visiting our secure platform. No app download needed — it works instantly on web or mobile.</p>
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <p className="text-teal-800 font-medium">💡 Pro Tip: Make sure you have a stable internet connection for the best experience.</p>
          </div>
        </div>
      ),
    },
    {
      id: "choose-document",
      title: "Choose What You Want to Verify",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Select the document or ID you want to verify from our supported options:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Aadhaar", icon: <User className="w-4 h-4" />, desc: "Government ID verification" },
              { name: "PAN Card", icon: <CreditCard className="w-4 h-4" />, desc: "Tax identification" },
              { name: "Driving License", icon: <Car className="w-4 h-4" />, desc: "Driving permit verification" },
              { name: "Voter ID", icon: <Vote className="w-4 h-4" />, desc: "Electoral identity proof" },
              { name: "Passport", icon: <IdCard className="w-4 h-4" />, desc: "International travel document" },
              { name: "Vehicle RC", icon: <Car className="w-4 h-4" />, desc: "Vehicle registration" },
              { name: "Bank Account", icon: <Banknote className="w-4 h-4" />, desc: "Banking details verification" },
              { name: "UPI ID", icon: <Smartphone className="w-4 h-4" />, desc: "Digital payment verification" },
              { name: "GST/Business", icon: <Building className="w-4 h-4" />, desc: "Business registration details" }
            ].map((doc, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-teal-600">{doc.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "enter-details",
      title: "Enter Your Details",
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Fill in your basic information or document number. The process is simple and secure.</p>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-orange-800 font-medium">⚠️ Note: For some documents like Aadhaar, you may receive an OTP to confirm your identity.</p>
          </div>
          <p>Make sure to enter accurate information to ensure successful verification.</p>
        </div>
      ),
    },
    {
      id: "instant-verification",
      title: "Instant Verification",
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Within seconds, your details are verified in real-time through trusted and government-authorized sources.</p>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">You'll see confirmation of:</h4>
            <div className="space-y-3">
              {[
                { item: "Name Match", desc: "Verify if the name matches official records" },
                { item: "Document Validity", desc: "Check if the document is authentic and active" },
                { item: "Key Details", desc: "Confirm DOB, address, and other important information" }
              ].map((check, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{check.item}</p>
                    <p className="text-sm text-gray-600">{check.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Secure and Private",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Your data is safe with us:</strong></p>
          <div className="space-y-3">
            {[
              "🔒 Aadhaar number is always masked",
              "🚫 No sensitive information is stored",
              "📋 We follow strict data protection policies",
              "🛡️ Bank-level security encryption"
            ].map((item, index) => (
              <div key={index} className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <p className="text-emerald-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "get-verified",
      title: "Get Verified, Instantly",
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Whether you're opening a bank account, joining a platform, or verifying identity for any service — Verify My KYC makes it instant, easy, and trustworthy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="text-teal-800 font-semibold">✅ 95%+ Coverage Across India</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-indigo-800 font-semibold">⚡ Verification Speed: ~0.5 to 3 Seconds</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-800 font-semibold">🔒 Trusted by Top Brands</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-orange-800 font-semibold">🏆 India's #1 KYC Verification Platform</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar/>
      <Header/>
      
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-20 h-20 mx-auto mb-6 text-teal-500" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              How to Get Verified
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fast, Secure & Seamless Identity Verification
            </p>
            <div className="text-lg text-gray-400 mt-2">
              KYC Verification, Aadhaar OTP, PAN Card Validation, UPI ID Check, India's #1 Identity Verification Platform**
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content & Accordion */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {verificationSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={{ ...step, index }}
              isExpanded={expandedSection === step.id}
              toggleSection={toggleSection}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="rounded-2xl shadow-xl border border-gray-200 bg-gray-100">
            <CardContent className="p-10 text-center">
              <Play className="w-14 h-14 mx-auto mb-6 text-teal-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Verified?</h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Start your instant KYC verification process now. It takes less than a minute!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => navigate("/user")}
                  className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Verification Now
                </button>
                <button
                  onClick={() => navigate("/contact-us")}
                  className="inline-flex items-center px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors duration-200 shadow-md transform hover:-translate-y-1 cursor-pointer"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Need Help? Contact Us
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Coverage Across India"
              value="95%+"
              color={{ bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", title: "text-emerald-800" }}
            />
            <StatCard
              title="Average Verification Time"
              value="<3s"
              color={{ bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", title: "text-cyan-800" }}
            />
            <StatCard
              title="Document Types Supported"
              value="9+"
              color={{ bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", title: "text-indigo-800" }}
            />
            <StatCard
              title="Available Service"
              value="24/7"
              color={{ bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", title: "text-amber-800" }}
            />
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}