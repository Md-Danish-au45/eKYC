import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Sparkles, Zap, Building2, Landmark, GraduationCap } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

// Helper Animation Components (no changes)
const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text}
    </span>
  );
};

const TypewriterText = ({ texts, className = "" }) => {
  const [currentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(texts[0]);
  useEffect(() => {
    setCurrentText(texts[0]);
  }, [texts]);

  return (
    <span className={className}>
      {currentText}
    </span>
  );
};

const FloatingElement = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

// Button Component with Light Blue Theme (no changes)
const ModernButton = ({ children, onClick, className = "" }) => {
  const baseClasses = "group relative font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 transform ";
  const primaryClasses = "bg-gray-900 text-white ";

  return (
    <button
      className={`${baseClasses} ${primaryClasses} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Image Visual Component
const ImageVisual = ({ image, alt = "Service illustration" }) => (
  // Updated Class: Using a fixed height like `h-[40rem]` to make it taller
  <div className="relative h-[40rem] flex items-center justify-center p-8 lg:p-12 ">
    <div className="relative w-full h-full max-w-lg lg:max-w-2xl">
      <div className="relative h-full flex items-center justify-center ">
        <div className="relative">
          <div className="relative  backdrop-blur-sm rounded-2xl p-4  ">
            <img
              src={image}
              alt={alt}
              className="w-full h-[40rem] object-contain rounded-xl "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Visual Components (keeping originals as fallbacks)
export const GovernmentIdVisual = () => (
  // Updated Class: Using a fixed height like `h-[40rem]`
  <div className="relative p-8 lg:p-12 flex items-center justify-center rounded-xl h-[40rem]">
    <div className="relative z-10 w-full max-w-md lg:max-w-xl">
      <div className="relative">
        <div className="relative w-full h-auto bg-white/90 backdrop-blur-lg rounded-2xl border border-white/50  p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
            <div className="text-xs font-bold text-gray-600">GOVERNMENT OF INDIA</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-16 h-16 bg-gray-800 rounded grid grid-cols-4 gap-0.5 p-1">
                {Array.from({ length: 16 }).map((_, i) => ( <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"}`} /> ))}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-sky-600">VERIFIED</div>
                <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
        <div className="flex items-center gap-2"> <Sparkles className="w-4 h-4" /> VERIFIED </div>
      </div>
    </div>
  </div>
);

export const CompanyCredentialVisual = () => (
  // Updated Class: Using a fixed height like `h-[40rem]`
  <div className="relative p-8 lg:p-12 flex items-center justify-center h-[40rem] rounded-xl">
    <div className="relative z-10 w-full max-w-md lg:max-w-xl">
      <div className="relative">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center"> <Building2 className="w-6 h-6 text-white" /> </div>
              <div>
                <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"> <CheckCircle className="w-5 h-5 text-white" /> </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => ( <div key={i} className="bg-gray-50 rounded-lg p-3"> <div className="h-2 bg-gray-200 rounded w-full mb-2"></div> <div className={`h-4 bg-sky-500 rounded w-3/4`}></div> </div> ))}
          </div>
          <div className="space-y-3">
            {["GST Registration", "FSSAI License", "Company Registration"].map((item, i) => ( <div key={i} className="flex items-center justify-between p-2 bg-green-50 rounded-lg"> <span className="text-sm font-medium text-gray-700">{item}</span> <CheckCircle className="w-4 h-4 text-green-500" /> </div> ))}
          </div>
        </div>
        <div className="absolute -top-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold"> VERIFIED </div>
        <div className="absolute -bottom-4 -right-4 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"> <Zap className="w-3 h-3" /> INSTANT </div>
      </div>
    </div>
  </div>
);

export const BankVisual = () => (
    // Updated Class: Using a fixed height like `h-[40rem]`
    <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-8 lg:p-12 flex items-center justify-center h-[40rem] rounded-xl">
        <div className="text-white text-3xl font-bold">Bank Verification Visual</div>
    </div>
);

export const EducationVisual = () => (
    // Updated Class: Using a fixed height like `h-[40rem]`
    <div className="relative bg-gradient-to-br from-red-500 to-amber-600 p-8 lg:p-12 flex items-center justify-center h-[40rem] rounded-xl">
        <div className="text-white text-3xl font-bold">Education Verification Visual</div>
    </div>
);

// Card Component (no changes)
const Card = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

// The Main ServiceCard Component
export default function ServiceCard({ data }) {
  const navigate = useNavigate();
  const { layout, badgeIcon: BadgeIcon, badgeText, titleLines, typewriterTexts, ctaText, VisualComponent, features, image } = data;

  const contentOrder = layout === 'image-left' ? 'lg:order-2' : 'lg:order-1';
  const visualOrder = layout === 'image-left' ? 'lg:order-1' : 'lg:order-2';

  return (
    <>
      <Card
        className="overflow-hidden border-0 rounded-3xl"
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text Content */}
            <div className={`p-8 lg:p-12 flex flex-col relative ${contentOrder}`}>
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-2 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-sky-200">
                  <BadgeIcon className="w-4 h-4" />
                  <AnimatedText text={badgeText} />
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {titleLines.map((line, index) => (
                    <React.Fragment key={index}>
                      <AnimatedText
                        text={line}
                        className={index % 2 !== 0 ? 'text-sky-600' : ''}
                      />
                      {index < titleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>

                <div className="text-gray-600 mb-6 text-lg leading-relaxed min-h-[60px]">
                  <TypewriterText texts={typewriterTexts} className="font-medium" />
                </div>

                <div className="space-y-3 mb-8">
                  {features.map((feature, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Buttons Section - Moved to bottom */}
              <div className="flex items-center flex-wrap gap-4 mt-auto">
                <ModernButton
                  onClick={() => {
                    if (data.navTo) navigate(data.navTo)
                    else navigate('/contact-us')
                  }}
                >
                  {ctaText}
                  <ArrowRight className="w-5 h-5" />
                </ModernButton>
              </div>
            </div>

            {/* Visual Content */}
            <div className={`relative flex items-center justify-center ${visualOrder}`}>
              {image ? (
                <ImageVisual image={image} alt={`${badgeText} illustration`} />
              ) : (
                <VisualComponent />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}