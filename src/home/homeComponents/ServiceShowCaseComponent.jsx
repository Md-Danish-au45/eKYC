"use client";

import React from 'react';
import ServiceCard from './ServiceShowcaseCard.jsx';
import { Shield, Building2, Landmark, GraduationCap, FileSignature, Home } from "lucide-react";

export default function ServicesShowcase() {
const servicesData = [
  {
    id: 1,
    layout: 'image-right',
    theme: {
      primary: 'from-sky-400 to-blue-500',
      badgeBg: 'from-sky-100 to-blue-100',
      badgeText: 'text-sky-700',
      shadow: 'shadow-sky-200 hover:shadow-sky-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300848/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_1_ia11bx.png",
    badgeIcon: Shield,
    badgeText: 'GOVERNMENT ID VERIFICATION',
    titleLines: ['Government ID Verification Service in India'],
    typewriterTexts: [
      "Online Aadhaar, PAN, Voter ID & Driving License verification API.",
      "Prevent identity fraud with 99.9% accurate document authentication.",
      "Best KYC and government ID verification solution for businesses.",
    ],
    features: [
      "Verify Aadhaar, PAN, Voter ID, Driving License instantly",
      "Government ID verification service with real-time results",
      "99.9% accuracy & secure data handling",
      "Trusted KYC verification provider in India",
    ],
    ctaText: 'Explore ID Products',
    navTo: '/services/government-id-verification'
  },
  {
    id: 2,
    layout: 'image-left',
    theme: {
      primary: 'from-purple-500 to-pink-600',
      badgeBg: 'from-purple-100 to-pink-100',
      badgeText: 'text-purple-700',
      shadow: 'shadow-purple-200 hover:shadow-purple-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300945/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_zemuzw.png",
    badgeIcon: Building2,
    badgeText: 'COMPANY & CREDENTIALS',
    titleLines: ['Company Credential Verification Services'],
    typewriterTexts: [
      "Check GST Registration, FSSAI License, MSME Certificate & ROC online.",
      "Business credential verification to prevent fraud.",
      "Ensure compliance with regulatory requirements instantly.",
    ],
    features: [
      "Instant GST, FSSAI, MSME & ROC verification services",
      "How to check if a business is legitimate & active",
      "Trusted company KYC & fraud detection provider",
      "Real-time business compliance checks",
    ],
    ctaText: 'Explore Business Products',
    navTo: '/services/company-credential-verification'
  },
  {
    id: 3,
    layout: 'image-right',
    theme: {
      primary: 'from-emerald-500 to-green-600',
      badgeBg: 'from-emerald-100 to-green-100',
      badgeText: 'text-emerald-700',
      shadow: 'shadow-emerald-200 hover:shadow-emerald-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300905/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_3_cp0jda.png",
    badgeIcon: Landmark,
    badgeText: 'BANK ACCOUNT VERIFICATION',
    titleLines: ['Instant Bank Account Verification API'],
    typewriterTexts: [
      "Validate beneficiary accounts instantly before transfers.",
      "Reduce payment fraud with real-time bank account checks.",
      "Compliant bank verification services as per RBI guidelines.",
    ],
    features: [
      "Instant bank account & IFSC code validation API",
      "How to verify beneficiary account before payment",
      "Supports all major Indian banks securely",
      "Fraud prevention with real-time bank verification",
    ],
    ctaText: 'Explore Bank Products',
    navTo: '/services/bank-verification'
  },
  {
    id: 4,
    layout: 'image-left',
    theme: {
      primary: 'from-red-500 to-amber-600',
      badgeBg: 'from-red-100 to-amber-100',
      badgeText: 'text-red-700',
      shadow: 'shadow-red-200 hover:shadow-red-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300924/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_4_dn8974.png",
    badgeIcon: GraduationCap,
    badgeText: 'EDUCATION VERIFICATION',
    titleLines: ['Education & Degree Verification Services'],
    typewriterTexts: [
      "Online degree, diploma & certificate validation for hiring.",
      "Prevent resume fraud with academic verification.",
      "Trusted education verification services for recruitment.",
    ],
    features: [
      "University & board certificate checks online",
      "Quick turnaround for HR onboarding processes",
      "Education verification trusted by global recruiters",
      "100% verified academic credentials instantly",
    ],
    ctaText: 'Explore Education Products',
    navTo: '/services/education-verification'
  },
  {
    id: 5,
    layout: 'image-right',
    theme: {
      primary: 'from-blue-500 to-indigo-600',
      badgeBg: 'from-blue-100 to-indigo-100',
      badgeText: 'text-blue-700',
      shadow: 'shadow-blue-200 hover:shadow-blue-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300884/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_2_wgmtxg.png",
    badgeIcon: FileSignature,
    badgeText: 'DIGITAL SIGNATURE & eSIGN',
    titleLines: ['Legally Valid Digital Signature Solutions'],
    typewriterTexts: [
      "Aadhaar-based eSign services for paperless workflows.",
      "Legally binding digital signatures compliant with IT Act, 2000.",
      "Best eSign API integration for businesses & enterprises.",
    ],
    features: [
      "Instant Aadhaar-based eSign for all documents",
      "Secure, paperless digital workflow",
      "How to integrate eSign API into your business",
      "Legally compliant with IT Act 2000",
    ],
    ctaText: 'Explore eSign Products',
    navTo: '/services/digital-signature'
  },
  {
    id: 6,
    layout: 'image-left',
    theme: {
      primary: 'from-orange-500 to-amber-600',
      badgeBg: 'from-orange-100 to-amber-100',
      badgeText: 'text-orange-700',
      shadow: 'shadow-orange-200 hover:shadow-orange-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300961/lindin_cover_otpn67.png",
    badgeIcon: Home,
    badgeText: 'PROPERTY & LAND RECORDS',
    titleLines: ['Property & Land Record Verification Services'],
    typewriterTexts: [
      "Check property ownership and land records online.",
      "Identify encumbrances before real estate purchase.",
      "Best property verification service to prevent fraud.",
    ],
    features: [
      "Verify land & property ownership records online",
      "How to check encumbrances before buying property",
      "Validate property title deeds instantly",
      "Real estate fraud prevention solutions",
    ],
    ctaText: 'Explore Realty Products',
    navTo: '/services/property-verification'
  }
];



  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Comprehensive Verification Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our powerful APIs and seamless integrations ensure fast, accurate, and secure identity and credential verification for your business.
          </p>
        </div>
        <div className="space-y-20">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} data={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
