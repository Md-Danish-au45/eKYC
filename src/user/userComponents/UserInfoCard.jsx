// UserInfoCard.jsx
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gem, Key, Rocket } from "lucide-react"; // Luxury icons

const toTitleCase = (str) => {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export function UserInfoCard({ services = [], activeServiceId, isSubscribed, onSubscribeClick }) {
  const navigate = useNavigate();

  const currentService = useMemo(() => {
    return services.find((s) => s.service_key === activeServiceId);
  }, [services, activeServiceId]);

  const handleTryOut = () => {
    if (!currentService) return;
    if (!isSubscribed) {
      // open subscription purchase flow
      onSubscribeClick && onSubscribeClick();
      return;
    }
    // navigate to execution page and pass the full service data via state for convenience
    navigate(`/user/try/${currentService.service_key}`, { state: { service: currentService } });
  };

  return (
    <Card className="relative overflow-hidden bg-white text-gray-800 shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 z-0 border border-transparent rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.05)' }}></div>

      <CardHeader className="relative z-10 pb-4 px-8 pt-8">
        <CardTitle className="text-2xl font-bold flex items-center gap-3 tracking-wide text-gray-900">
          <Gem className="w-7 h-7 text-amber-500" />
          {currentService ? currentService.name : "Select a Service"}
        </CardTitle>
        <p className="text-gray-500 text-sm mt-2 font-normal">
          {isSubscribed
            ? "You have exclusive access to this premium service. Click 'Try' to begin."
            : "Elevate your experience. Subscribe to unlock this service and its full potential."}
        </p>
      </CardHeader>

      <CardContent className="relative z-10 px-8 pb-8 space-y-6">
        {!currentService ? (
          <p className="text-sm text-gray-400 text-center py-10">Select a service from the panel to explore the details.</p>
        ) : (
          <>
            <div className="flex items-start gap-5 pt-4">
              <div>
                <h3 className="font-semibold text-xl text-gray-900">{currentService.name}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{currentService.description || currentService.excerpt}</p>
                <p className="text-xs text-gray-400 mt-3 font-medium uppercase tracking-widest">{toTitleCase(currentService.category)}</p>
              </div>
            </div>

            <div className="pt-4">
              {isSubscribed ? (
                <Button onClick={handleTryOut} className="w-full h-12 font-bold text-base tracking-wider bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                  <Rocket className="w-5 h-5 mr-3" />
                  Try Service
                </Button>
              ) : (
                <Button onClick={handleTryOut} className="w-full h-12 font-bold text-base tracking-wider bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md">
                  <Key className="w-5 h-5 mr-3" />
                  Unlock
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}