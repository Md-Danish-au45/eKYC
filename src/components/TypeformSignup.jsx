"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const colorPalette = [
  { color: "#3B82F6", name: "blue" },
  { color: "#10B981", name: "green" },
  { color: "#F59E0B", name: "yellow" },
  { color: "#8B5CF6", name: "purple" },
]

const ratingNumbers = [1, 2, 3, 4, 5]

export default function TypeformSignup() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [selectedRating, setSelectedRating] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-purple-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-100 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2 tracking-tight">Join us today</h1>
        <h2 className="text-2xl md:text-3xl font-light text-gray-600 tracking-tight">Start your journey</h2>
      </div>

      {/* Interactive Design Showcase */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Color Palette Card */}
        <div className="absolute -left-32 -top-8 z-20">
          <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium">Choose Color</p>
            <div className="flex gap-3">
              {colorPalette.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(item.color)}
                  className={`w-6 h-6 rounded-full transition-all duration-200 hover:scale-110 ${
                    selectedColor === item.color ? "ring-2 ring-gray-300 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: item.color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Font Selector Dropdown */}
        <div className="absolute -top-16 left-8 z-30">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors w-40"
            >
              <span className="text-sm font-medium">Typography</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="border-t border-gray-100 bg-white">
                <div className="py-2">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-sans">
                    Inter
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-serif">
                    Georgia
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-mono">
                    Monaco
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Illustration Card */}
        <Card className="w-80 h-96 bg-white border border-gray-200 shadow-xl overflow-hidden relative">
          <CardContent className="p-0 h-full relative">
            {/* Clean geometric elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
              {/* Simple shapes */}
              <div className="absolute top-16 right-8 w-20 h-28 bg-blue-200 rounded-2xl opacity-60 transform rotate-12" />
              <div className="absolute bottom-20 left-12 w-16 h-16 bg-green-200 rounded-full opacity-70" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-28 h-36 bg-yellow-100 rounded-3xl opacity-80 transform -rotate-12 border-2 border-yellow-200" />
              </div>

              {/* Simple decorative element */}
              <div className="absolute bottom-16 right-16">
                <div className="w-8 h-8 bg-purple-200 rounded-lg transform rotate-45 opacity-80" />
                <div className="w-6 h-6 bg-purple-300 rounded-lg transform rotate-12 mt-2 ml-2 opacity-70" />
              </div>

              {/* Clean dots */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full" />
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-green-400 rounded-full" />
              <div className="absolute top-12 right-12 w-2 h-2 bg-yellow-400 rounded-full" />
            </div>

            {/* Navigation indicator */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Rating Survey Card */}
        <div className="absolute -left-24 top-32 z-20">
          <Card className="w-64 bg-white border border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-gray-800 font-medium mb-6 leading-tight text-sm">
                How do you rate our service?
              </h3>
              <div className="flex gap-2">
                {ratingNumbers.map((number) => (
                  <Button
                    key={number}
                    onClick={() => setSelectedRating(number)}
                    variant="outline"
                    size="sm"
                    className={`w-8 h-8 p-0 text-sm font-medium border-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 ${
                      selectedRating === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"
                    }`}
                  >
                    {number}
                  </Button>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 mt-16">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors shadow-md">
          Get Started
        </Button>
        <p className="text-gray-500 text-sm mt-3 text-center">No credit card required</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-400 text-sm">Made with ❤️ for better experiences</p>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-green-300 rounded-full animate-bounce opacity-30 animation-delay-1000" />
      <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-20" />
    </div>
  )
}