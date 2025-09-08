// SEO Keywords: Digital identity, KYC verification, security solutions, identity verification platform, AI-powered KYC, fintech, RegTech, fraud prevention, digital trust, online security.

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, Handshake, Heart } from 'lucide-react';

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TeamMember = ({ name, role, quote, experience, image, delay = 0 }) => {
  return (
    <AnimatedSection className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-500">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-cyan-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 italic mb-3">"{quote}"</p>
        <p className="text-sm text-gray-500">{experience}</p>
      </motion.div>
    </AnimatedSection>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-800">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Leading the future of digital identity with seamless and secure verification.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Intro Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Building a Foundation of Trust in the Digital World
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In a world where digital interactions are the new norm, establishing trust is more critical than ever. Our company was founded on the belief that secure, instant identity verification should be a right, not a luxury. We build the technology that enables businesses to connect with their customers with confidence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By leveraging cutting-edge AI and a human-centric approach, we've developed a platform that not only detects fraud but also enhances user experience, making digital onboarding faster and more reliable than ever before.
              </p>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2">
              <img
                src="https://res.cloudinary.com/dz10btkpg/image/upload/v1757301208/Smart_IOT_Solutions_in_in_tpp4ma.png"
                alt="A team collaborating and innovating"
                className="rounded-xl  w-full h-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Meet the Founder
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our journey began with a single vision: to simplify a complex process. Our founder, a veteran in the fintech space, recognized the friction and fraud rampant in traditional identity verification. They set out to create a solution that was not only robust and secure but also intuitive and fast.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Driven by a passion for technology and a commitment to security, they assembled a team of experts to build a platform that redefines digital trust. Their leadership continues to inspire our mission to make the digital world a safer place for everyone.
              </p>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2">
              <img
                src="https://res.cloudinary.com/dz10btkpg/image/upload/v1757305143/Smart_IOT_Solutions_in_in_cm37uk.png"
                alt="Founder of the company"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-cyan-600 font-semibold mb-4">To make digital trust universal.</p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower businesses and individuals with a robust, intuitive, and compliant identity verification platform. We aim to remove the barriers to trust in the digital economy, fostering a secure and inclusive environment for all.
              </p>
            </AnimatedSection>
            <AnimatedSection className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-xl text-indigo-600 font-semibold mb-4">A future without digital fraud.</p>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where digital identities are as reliable and secure as their physical counterparts. Through continuous innovation, we strive to be the leading force in preventing online fraud and building a digitally secure future.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated individuals guiding our mission to build a more secure digital world.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Sarah Chen"
              role="Chief Executive Officer"
              quote="Innovation is our engine; trust is our currency."
              experience="15+ years in product and strategy • Ex-Stripe, Google"
              image="https://placehold.co/300x300/F4B5B4/FFFFFF?text=Sarah+C"
              delay={0}
            />
            <TeamMember
              name="David Lee"
              role="Chief Technology Officer"
              quote="We build technology that protects people and businesses."
              experience="20+ years in software architecture • Ex-Microsoft, Salesforce"
              image="https://placehold.co/300x300/527A8A/FFFFFF?text=David+L"
              delay={0.2}
            />
            <TeamMember
              name="Emily White"
              role="Head of Product"
              quote="User experience and security are not mutually exclusive."
              experience="10+ years in UX/UI and product design • Ex-Uber, Airbnb"
              image="https://placehold.co/300x300/B8E986/FFFFFF?text=Emily+W"
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
