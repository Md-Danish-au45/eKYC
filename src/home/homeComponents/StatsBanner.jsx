"use client"

import { useState, useEffect, useRef } from "react"
import { TrendingUp, Users, Zap, Clock, Shield, CircleCheck, ArrowRight } from "lucide-react"

const statsData = [
  {
    value: "95%",
    description: "Coverage across India",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    name: "Coverage"
  },
  {
    value: "~0.5s",
    description: "Average time to verify a user",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    name: "Speed"
  },
  {
    value: "~3s",
    description: "End-to-end verification speed",
    icon: Clock,
    color: "from-orange-500 to-amber-500",
    name: "Efficiency"
  },
  {
    value: "#1",
    description: "Verification solution in India",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    name: "Trust"
  },
]

const CountUpAnimation = ({
  end,
  duration = 2000,
  isVisible,
}) => {
  const [count, setCount] = useState("0")
  const ref = useRef()

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    let numericEnd
    let isPercent = false
    let isTilde = false

    if (end.includes("%")) {
      numericEnd = Number.parseInt(end.replace("%", ""))
      isPercent = true
    } else if (end.includes("~")) {
      numericEnd = Number.parseFloat(end.replace("~", "").replace("s", ""))
      isTilde = true
    } else if (end.includes("#")) {
      setTimeout(() => setCount(end), duration / 2)
      return
    } else {
      numericEnd = Number.parseInt(end)
    }

    const increment = numericEnd / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= numericEnd) {
        setCount(
          isTilde
            ? `~${numericEnd}s`
            : isPercent
              ? `${numericEnd}%`
              : `${numericEnd}`,
        )
        clearInterval(timer)
      } else {
        setCount(
          isTilde
            ? `~${start.toFixed(1)}s`
            : isPercent
              ? `${Math.floor(start)}%`
              : `${Math.floor(start)}`,
        )
      }
    }, 50)

    return () => clearInterval(timer)
  }, [end, duration, isVisible])

  return <span>{count}</span>
}

const StatCard = ({
  stat,
  index,
  isVisible,
}) => {
  const IconComponent = stat.icon

  return (
    <div
      className={`
        group relative w-full rounded-2xl p-px transition-all duration-500 ease-out
        transform hover:-translate-y-2
        ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}
      `}
      style={{
        animationDelay: `${index * 150}ms`,
        animationDuration: "600ms",
        animationFillMode: "forwards",
      }}
    >
      {/* Background Gradient Border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} p-px transition-all duration-500 group-hover:p-1`} />
      
      {/* Card Content */}
      <div className="relative z-10 h-full w-full rounded-2xl bg-white p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className={`w-5 h-5 md:w-6 md:h-6 text-gray-700`} />
          </div>
          <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
            {stat.name}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
            <CountUpAnimation end={stat.value} isVisible={isVisible} />
          </p>
        </div>

        <p className="text-sm text-gray-600 font-medium">
          {stat.description}
        </p>
      </div>
    </div>
  )
}

export default function StatsBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 relative overflow-hidden"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-600 tracking-wide mb-4">
            <CircleCheck className="w-4 h-4 text-gray-500" />
            Verified Performance
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${isVisible ? "animate-in slide-in-from-top-4 fade-in duration-700" : "opacity-0"}`}
          >
            Built for Scale and Reliability
          </h2>

          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto ${isVisible ? "animate-in slide-in-from-top-4 fade-in duration-700" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            Our platform provides seamless, lightning-fast verification solutions that your business can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? "animate-in fade-in duration-700" : "opacity-0"}`}
          style={{ animationDelay: "800ms" }}
        >
           <a 
              href="#" 
              className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300 group"
            >
              Explore our full suite of services
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  )
}