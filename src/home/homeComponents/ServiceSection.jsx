import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import { useGetServicesQuery } from "@/app/api/serviceApiSlice";
import { CheckCircle, Loader2, ChevronRight, Menu, X, Filter, Grid, List, Star, ArrowRight } from "lucide-react";
import ComingSoonCard from "./ComingSoonCard";
// Static images to use randomly for services
import PANCardImage from "@/assets/PANCardImage.svg";
import AadharCardImage from "@/assets/AadharCardImage.svg";
import VoterCardImage from "@/assets/VoterCardImage.svg";
import PassportCardImage from "@/assets/PassportCardImage.svg";
import criminal from "@/assets/criminal.png";

const staticImages = [PANCardImage, AadharCardImage, VoterCardImage, PassportCardImage];

// Category mapping from API values to display categories
const categoryMapping = {
  'Identity Verification': 'Personal',
  'Financial & Business Checks': 'Finance and Banking',
  'Legal & Compliance Checks': 'Government',
  'Health & Government Records': 'Government',
  'Biometric & AI-Based Verification': 'Biometric',
  'Profile & Database Lookup': 'Personal',
  'Criminal Verification': 'Government',
  'Land Record Check': 'Government'
};

// Reverse mapping for filtering (display category to API categories)
const reverseMapping = {
  'Personal': ['Identity Verification', 'Profile & Database Lookup'],
  'Business': [],
  'Government': ['Legal & Compliance Checks', 'Health & Government Records', 'Criminal Verification', 'Land Record Check'],
  'Biometric': ['Biometric & AI-Based Verification'],
  'Finance and Banking': ['Financial & Business Checks'],
  'Covid check': []
};

// Helper function to get random image
const getRandomImage = (index) => {
  return staticImages[index % staticImages.length];
};

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  
  const { 
    data: servicesResponse, 
    isLoading, 
    isError, 
    error 
  } = useGetServicesQuery();

  // Memoize filtered services to ensure a stable reference on each render
  const filteredServices = useMemo(() => {
    const services = servicesResponse?.data || [];
    const sortedServices = [...services].sort((a, b) => b.globalUsageCount - a.globalUsageCount);

    if (activeCategory === "All") {
      const personalApiCategories = reverseMapping['Personal'] || [];
      const personalServices = sortedServices.filter(service => 
        personalApiCategories.includes(service.category)
      );
      // Static services for "Coming Soon"
      const staticServices = [
        {
          _id: 'static-criminal-verification',
          name: 'Criminal Verification',
          price: 299,
          globalUsageCount: 0,
          is_active: false,
          isStatic: true,
          category: 'Criminal Verification',
          serviceImage: criminal
        },
        {
          _id: 'static-pan-verification',
          name: 'PAN Card Verification',
          price: 299,
          globalUsageCount: 0,
          is_active: false,
          isStatic: true,
          category: 'Identity Verification',
          serviceImage: PANCardImage
        },
        {
          _id: 'static-aadhaar-verification', 
          name: 'Aadhaar Verification',
          price: 299,
          globalUsageCount: 0,
          is_active: false,
          isStatic: true,
          category: 'Identity Verification',
          serviceImage: AadharCardImage
        },
      ];
      // Show static services at the top, then real services
      const filteredEPFO = services.filter(service => service.name === 'EPFO Employer Verification')[0];
      const filteredVoter = services.filter(service => service.name === "Voter ID Verification")[0];
      
      const combinedServices = [...staticServices, ...personalServices.slice(0, 2)];
      if (filteredEPFO) combinedServices.push(filteredEPFO);
      if (filteredVoter) combinedServices.push(filteredVoter);
      
      return combinedServices;
    } else {
      const apiCategoriesToFilter = reverseMapping[activeCategory] || [];
      return sortedServices.filter(service => 
        apiCategoriesToFilter.includes(service.category)
      );
    }
  }, [servicesResponse, activeCategory]);

  const services = servicesResponse?.data || [];
  const apiCategories = [...new Set(services.map(service => service.category))];
  const displayCategories = [...new Set(apiCategories.map(apiCat => categoryMapping[apiCat]).filter(Boolean))];
  const categories = ["All", ...displayCategories];
  
  // All hooks should be at the top level, before any conditional returns.
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize the handleScrollZoom function to avoid re-creation on every render
  const handleScrollZoom = useCallback(() => {
    if (!sectionRef.current || cardRefs.current.length === 0) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveCardIndex(closestIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollZoom);
    handleScrollZoom(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScrollZoom);
  }, [handleScrollZoom, filteredServices.length]);


  const handleCardClick = (serviceId) => {
    window.location.href = `/product/${serviceId}`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-b from-blue-50 to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Loading Services...</h2>
        </div>
      </section>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <section className="w-full bg-gradient-to-b from-red-50 to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-red-700">Unable to Load Services</h2>
          <p className="mt-2 text-gray-600">
            {error?.data?.message || "Something went wrong while fetching the services."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full bg-white-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
            <CheckCircle className="w-4 h-4" />
India’s Leading Verification Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
Top Identity & Background
            <span className="bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
              {' '}
              Verification Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
Powering trust for thousands of users in India.
          </p>
        </div>
        

        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-1/4 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24 h-fit transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                <Filter size={20} className="text-blue-500" />
                Service Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold border border-blue-100 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                    }`}
                    onClick={() => {
                      setActiveCategory(category);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="flex items-center">
                      {activeCategory === category && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      )}
                      {category}
                    </span>
                    {activeCategory === category && (
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Main content area with services */}
          <main className="lg:w-3/4">
            {filteredServices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  {activeCategory === "All" 
                    ? "No services are currently available." 
                    : `No services found in the "${activeCategory}" category.`
                  }
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {filteredServices.map((service, index) => (
                  <div
                    key={service._id}
                    ref={(el) => cardRefs.current[index] = el}
                    onClick={() => !service.isStatic && handleCardClick(service._id)}
                    className={`transform-gpu transition-all duration-500 ease-in-out cursor-pointer h-full ${
                      activeCardIndex === index 
                        ? 'lg:col-span-2' 
                        : ''
                    }`}
                  >
                    <div className={`transition-all duration-500 ease-in-out h-full transform-gpu ${
                        activeCardIndex === index
                            ? 'scale-105 shadow-2xl z-10'
                            : 'scale-100 opacity-70 shadow-lg'
                    }`}>
                        {service.isStatic ? (
                            <div className="group relative bg-gradient-to-br from-gray-50 via-gray-100/30 to-slate-100/50 rounded-3xl overflow-hidden border border-gray-200/50 h-full flex flex-col backdrop-blur-sm shadow-xl">
                                {/* Header with image and overlay */}
                                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-400 to-slate-600">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 via-slate-500/30 to-gray-600/20"></div>
                                <img 
                                    src={service.serviceImage}
                                    alt={service.name}
                                    className="w-full h-full object-contain p-8 filter drop-shadow-2xl grayscale"
                                />
                                
                                {/* Coming Soon badge */}
                                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-4 py-2 flex items-center shadow-lg backdrop-blur-sm">
                                    <Star className="w-4 h-4 fill-current mr-2" />
                                    <span className="text-sm font-bold">COMING SOON</span>
                                </div>
                                </div>
                                
                                {/* Content area */}
                                <div className="p-8 flex-1 flex flex-col relative">
                                {/* Service name with modern typography */}
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-600 via-slate-700 to-gray-800 bg-clip-text text-transparent mb-2 leading-tight">
                                    {service.name}
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full"></div>
                                </div>
                                
                                {/* Coming Soon section */}
                                <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100/50">
                                    <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-3 animate-pulse"></div>
                                        <span className="text-orange-800 font-semibold">Coming Soon</span>
                                    </div>
                                    <div className="text-orange-700 font-bold text-lg">
                                        Stay Tuned!
                                    </div>
                                    </div>
                                </div>
                                
                                {/* Pricing and action section */}
                                <div className="mt-auto">
                                    <div className="flex items-end justify-between mb-6">
                                    <div>
                                        <div className="flex items-baseline">
                                        <span className="text-4xl font-bold bg-gradient-to-r from-gray-500 to-slate-600 bg-clip-text text-transparent">
                                            ₹{service.price}
                                        </span>
                                        <span className="text-gray-500 ml-2 text-lg">/verification</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Coming soon • Get notified</p>
                                    </div>
                                    </div>
                                    
                                    {/* Action button */}
                                    <button className="w-full py-4 px-6 bg-gradient-to-r from-gray-400 to-slate-500 text-white rounded-2xl font-bold text-lg cursor-default flex items-center justify-center opacity-75">
                                    <Star className="w-5 h-5 mr-3 text-yellow-300" />
                                    <span>Coming Soon</span>
                                    </button>
                                </div>
                                </div>
                                
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-300/10 to-slate-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-400/10 to-slate-500/10 rounded-full translate-y-12 -translate-x-12"></div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={getRandomImage(index)} 
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                    <span className="text-sm font-medium text-gray-900">Premium</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16"></div>
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">{service.name}</h3>
                                <p className="text-gray-600 mb-4 flex items-center text-lg">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    {service.globalUsageCount.toLocaleString()} verifications
                                </p>
                                
                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div>
                                    <span className="text-3xl font-bold text-blue-700">₹{service.price}</span>
                                    <span className="text-sm text-gray-500 block">one-time fee</span>
                                    </div>
                                    <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-400 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center">
                                    Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.map((service, index) => (
                  <div
                    key={service._id}
                    ref={(el) => cardRefs.current[index] = el}
                    onClick={() => !service.isStatic && handleCardClick(service._id)}
                    className={`bg-white rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row gap-6 transition-all duration-700 ${service.isStatic ? 'cursor-default' : 'cursor-pointer'} ${
                     activeCardIndex === index ? 'scale-105 opacity-100 shadow-xl z-10' : 'scale-100 opacity-100 shadow-md'
                    }`}
                    style={{ 
                      marginBottom: index === filteredServices.length - 1 ? '0' : '80px'
                    }}
                  >
                    <div className="md:w-1/4 relative">
                      <img 
                        src={service.isStatic ? service.serviceImage : getRandomImage(index)} 
                        alt={service.name}
                        className="w-full h-40 object-contain rounded-xl"
                      />
                      {!service.isStatic && (
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-sm">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-xs font-medium text-gray-900">Premium</span>
                        </div>
                      )}
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        {service.globalUsageCount.toLocaleString()} verifications
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-blue-700">₹{service.price}</span>
                          <span className="text-sm text-gray-500 block">one-time fee</span>
                        </div>
                        {service.isStatic ? (
                          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium cursor-default flex items-center">
                            Coming Soon <Star className="w-4 h-4 ml-2 text-yellow-500" />
                          </button>
                        ) : (
                          <button className="px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-400 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-1000 shadow-sm hover:shadow-md flex items-center">
                            Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}