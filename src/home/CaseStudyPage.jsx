"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Shield, Clock, Star, ArrowUpRight, Menu } from "lucide-react"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"
// SEO Keywords: Identity Verification, KYC, Fraud Prevention, Digital Onboarding,
// AML Compliance, Customer Verification, Fintech Solutions, E-commerce, Banking.
import TopBar from "./homeComponents/TopBar"

const stats = [
  { label: "Identity Success Rate", value: "99.8%", icon: CheckCircle },
  { label: "Fraud Reduction", value: "94%", icon: Shield },
  { label: "Time Saved", value: "75%", icon: Clock },
  { label: "Client Satisfaction", value: "4.9/5", icon: Star },
];

const caseStudies = [
  {
    id: 1,
    title: "FinTech Startup Reduces Fraud by 95%",
    company: "PaySecure",
    industry: "Financial Technology",
    challenge: "High fraud rates and manual verification processes",
    solution: "Implemented AI-powered identity verification with real-time document scanning",
    results: [
      "95% reduction in fraudulent accounts",
      "80% faster onboarding process",
      "99.2% accuracy in identity verification",
      "$2.3M saved in fraud prevention",
    ],
    image: "https://www.commercialdesignindia.com/cloud/2025/05/19/9DfwaoRC-E_PS1_7166_FS1-1200x675.jpg", // Indian fintech/digital banking theme
    testimonial:
      "VerifyMyKyc transformed our onboarding process. We went from hours to minutes while dramatically improving security.",
    author: "Sarah",
    position: "CTO",
    metrics: {
      fraudReduction: "95%",
      timeReduction: "80%",
      accuracy: "99.2%",
      savings: "$2.3M",
    },
  },
  {
    id: 2,
    title: "E-commerce Platform Scales Globally",
    company: "ShopGlobal",
    industry: "E-commerce",
    challenge: "Expanding to 15+ countries with varying compliance requirements",
    solution: "Multi-language KYC solution with region-specific document support",
    results: [
      "Expanded to 18 countries successfully",
      "Reduced compliance costs by 60%",
      "Improved customer satisfaction by 45%",
      "Processed 500K+ verifications monthly",
    ],
    image: "https://plus.unsplash.com/premium_photo-1683141172508-b67ca5f17194?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000", // Indian e-commerce theme
    testimonial: "The global compliance features made our international expansion seamless and cost-effective.",
    author: "Mohit Gupta",
    position: "Head of Operations",
    metrics: {
      countries: "18",
      costReduction: "60%",
      satisfaction: "45%",
      volume: "500K+",
    },
  },
  {
    id: 3,
    title: "Banking App Achieves 100% Regulatory Compliance",
    company: "NeoBank",
    industry: "Digital Banking",
    challenge: "Meeting strict regulatory requirements while maintaining user experience",
    solution: "Comprehensive KYC/AML solution with automated compliance reporting",
    results: [
      "100% regulatory compliance achieved",
      "50% reduction in compliance team workload",
      "Zero regulatory penalties",
      "4.8/5 user experience rating",
    ],
    image: "https://cdn.techinasia.com/wp-content/uploads/2025/04/1745549426_1737991117555-750x563.jpg", // Indian banking compliance theme
    testimonial:
      "We achieved perfect compliance without sacrificing user experience. The automated reporting saved us countless hours.",
    author: "Rahul Das",
    position: "Compliance Director, NeoBank",
    metrics: {
      compliance: "100%",
      workloadReduction: "50%",
      penalties: "0",
      rating: "4.8/5",
    },
  },
];

// Reusable Button Component with rounded corners
const Button = ({ children, onClick, className = "", size = "md" }) => {
  const baseClasses = "font-medium transition-all duration-300 rounded-full flex items-center justify-center";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </button>
  );
};

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
);



export default function CaseStudyPage() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const handleNavigate = () => {
      window.location.href = "/user";
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
          <TopBar/>
<Header/>
            {/* Hero Section with SEO Keywords */}
            <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Real Results: KYC, Fraud Prevention & Identity Verification
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Discover how leading companies across industries have streamlined their identity verification,
                            reduced fraud, and improved customer experience with our advanced KYC solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3 mx-auto">
                                        <stat.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Success Stories</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See how our clients have achieved remarkable results with our digital onboarding and AML compliance solutions.
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`grid lg:grid-cols-2 gap-12 items-center p-8 bg-white rounded-xl shadow-lg ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                                        {study.industry}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{study.title}</h3>
                                    <p className="text-lg text-gray-600 mb-6">{study.company}</p>

                                    {/* Challenge & Solution */}
                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                                            <p className="text-gray-600">{study.challenge}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                                            <p className="text-gray-600">{study.solution}</p>
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">Key Results:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {study.results.map((result, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-blue-50 border-l-4 border-l-blue-500 rounded-lg p-6">
                                        <p className="text-gray-700 italic mb-4">"{study.testimonial}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{study.author}</div>
                                                <div className="text-sm text-gray-600">{study.position}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image & Metrics */}
                                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                                    <div className="relative">
                                        <img
                                            src={study.image || "/placeholder.svg"}
                                            alt={study.title}
                                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {Object.entries(study.metrics).map(([key, value], idx) => (
                                            <Card key={key} className="text-center p-4 hover:shadow-xl transition-shadow">
                                                <div className="p-0">
                                                    <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                                                    <div className="text-sm text-gray-600 capitalize">
                                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with SEO Keywords */}
            <section className="py-20 bg-blue-700">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Streamline Your Customer Verification?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join hundreds of companies that trust VerifyMyKyc for their secure digital onboarding and compliance needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={handleNavigate} size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                                Get Started Today
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                className="border border-white text-white hover:bg-white hover:text-blue-700 bg-transparent"
                            >
                                Schedule a Demo
                                <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
<Footer/>
        </div>
    );
}
