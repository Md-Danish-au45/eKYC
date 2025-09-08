"use client"

import { Lock, Info, ShieldCheck, LogOut, Phone, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser, logOut } from "@/features/auth/authSlice"

export default function TopBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  const handleLogout = () => {
    dispatch(logOut())
    navigate("/login")
  }

  return (
    <div className="bg-gray-900 text-gray-200 py-2 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-8">
        {/* Left Section - Security & Contact Info */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-400">Instant & Secure Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-400">Data Encrypted</span>
          </div>
        </div>

        {/* Right Section - Main Navigation */}
        <nav className="flex items-center space-x-2 md:space-x-6 text-sm font-medium ml-auto"> {/* space-x-2 for smaller gap on mobile */}
          {/* Support and Contact Links */}
          <button onClick={() => navigate("/contact-us")} className="hidden md:flex items-center gap-2 hover:text-[#00A3A3] transition-colors duration-200">
            <Mail className="w-4 h-4" />
            <span>Contact Sales</span>
          </button>
          
          <span className="hidden md:block text-gray-500">|</span>

          {user ? (
            <>
              <button onClick={() => navigate("/how-to-get-verify")} className="flex items-center gap-1 md:gap-2 hover:text-[#00A3A3] transition-colors duration-200 text-xs md:text-sm"> {/* text-xs for mobile */}
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> {/* Smaller icon on mobile */}
                <span>How to verify</span> {/* Shortened text for mobile */}
              </button>
              <button onClick={handleLogout} className="flex items-center gap-1 md:gap-2 hover:text-[#00A3A3] transition-colors duration-200 text-xs md:text-sm"> {/* text-xs for mobile */}
                <LogOut className="w-3 h-3 md:w-4 md:h-4" /> {/* Smaller icon on mobile */}
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/how-to-get-verify")} className="flex items-center gap-1 md:gap-2 hover:text-[#00A3A3] transition-colors duration-200 text-xs md:text-sm"> {/* text-xs for mobile */}
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> {/* Smaller icon on mobile */}
                <span>How to verify</span> {/* Shortened text for mobile */}
              </button>
              <button onClick={() => navigate("/login")} className="flex items-center gap-1 md:gap-2 hover:text-[#00A3A3] transition-colors duration-200 text-xs md:text-sm"> {/* text-xs for mobile */}
                <Lock className="w-3 h-3 md:w-4 md:h-4" /> {/* Smaller icon on mobile */}
                <span>Login</span>
              </button>
              <button onClick={() => navigate("/signup")} className="flex items-center gap-1 md:gap-2 hover:text-[#00A3A3] transition-colors duration-200 text-xs md:text-sm"> {/* text-xs for mobile */}
                <Info className="w-3 h-3 md:w-4 md:h-4" /> {/* Smaller icon on mobile */}
                <span>Sign Up</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}