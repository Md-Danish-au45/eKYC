"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, Phone, ArrowLeft, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthCard } from "@/cards/AuthCard"
import { FloatingLabel } from "@/components/FloatingLabel"
import { setCredentials } from "@/features/auth/authSlice"
import { useSignupMutation, useLoginWithGoogleMutation, useVerifyEmailOtpMutation,useSimpleSignupMutation } from "@/app/api/authApiSlice"
import { auth, googleProvider } from "@/firebase/firebaseConfig.js"
import { signInWithPopup } from "firebase/auth"
import { useDispatch } from "react-redux"
import logo from "../assets/logo.png"


export function SignUpForm() {
  const [step, setStep] = useState(1)
  const [phoneFlow, setPhoneFlow] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: ""
  })
  const [errors, setErrors] = useState({})
  const [otpTimer, setOtpTimer] = useState(0)
  const [canResendOtp, setCanResendOtp] = useState(true)

  // --- START: FIX FOR PASSWORD TOGGLE ---
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const handleTogglePassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  // --- END: FIX FOR PASSWORD TOGGLE ---
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [signup, { isLoading: isSigningUp, error: apiError }] = useSignupMutation()
  const [simpleSignup, { isLoading: isSimpleSignUp, error: signApiError }] = useSimpleSignupMutation()
  const [loginWithGoogle, { isLoading: isGoogleLoading, error: googleError }] = useLoginWithGoogleMutation()
  const [verifyEmailOtp, { isLoading: isVerifyingOtp, error: otpError }] = useVerifyEmailOtpMutation()

  // Timer effect for OTP resend
  useEffect(() => {
    let interval = null
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(otpTimer - 1)
      }, 1000)
    } else if (otpTimer === 0 && !canResendOtp) {
      setCanResendOtp(true)
    }
    return () => clearInterval(interval)
  }, [otpTimer, canResendOtp])

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswords = () => {
    const newErrors = {}
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOtp = () => {
    const newErrors = {}
    if (!formData.otp) newErrors.otp = "OTP is required"
    else if (formData.otp.length !== 6) newErrors.otp = "OTP must be 6 digits"
    else if (!/^\d+$/.test(formData.otp)) newErrors.otp = "OTP must contain only numbers"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setErrors({})
      setStep(2)
    }
  }

  const handlePasswordSubmit = async () => {
    if (!validatePasswords()) return
    
    try {
      const { name, email, password } = formData
      // Send signup request which should trigger OTP email
      await signup({ name, email, password }).unwrap()
      
      // Move to OTP verification step
      setStep(3)
      startOtpTimer()
    } catch (err) {
      console.error("Failed to sign up:", err)
    }
  }
    const handleSimpleSignup = async () => {
    if (!validatePasswords()) return
    
    try {
      const { name, email, password } = formData
      // Send signup request which should trigger OTP email
      await simpleSignup({ name, email, password }).unwrap()
      
      // Move to OTP verification step
      // setStep(3)
      // startOtpTimer()
       navigate("/login", { 
        state: { 
          message: "Email verified successfully! Please log in.", 
          email: formData.email 
        } 
      })
    } catch (err) {
       const message = err?.data?.message || "Registration failed. Try again."

    setErrors({ password: message }) // show message under email field
      console.error("Failed to sign up:", err)
    }
  }


  const handleOtpVerification = async (e) => {
    e.preventDefault()
    if (!validateOtp()) return

    try {
      const { email, otp } = formData
      await verifyEmailOtp({ email, otp }).unwrap()
      
      // Success - redirect to login or dashboard
      navigate("/login", { 
        state: { 
          message: "Email verified successfully! Please log in.", 
          email: formData.email 
        } 
      })
    } catch (err) {
      console.error("Failed to verify OTP:", err)
      setErrors({ otp: "Invalid OTP. Please try again." })
    }
  }

  const handleResendOtp = async () => {
    if (!canResendOtp) return
    
    try {
      const { name, email, password } = formData
      await signup({ name, email, password }).unwrap()
      startOtpTimer()
    } catch (err) {
      console.error("Failed to resend OTP:", err)
    }
  }

  const startOtpTimer = () => {
    setOtpTimer(60) // 60 seconds
    setCanResendOtp(false)
  }

  const handleBack = () => {
    setErrors({})
    if (step === 3) {
      setStep(2)
    } else {
      setStep(1)
      setPhoneFlow(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (phoneFlow) {
      handlePhoneLogin()
      return
    }
    
    if (step === 2) {
      // handlePasswordSubmit()

      handleSimpleSignup()
    } else if (step === 3) {
      handleOtpVerification(e)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      const response = await loginWithGoogle({ token: idToken }).unwrap()
      dispatch(setCredentials(response))
    
      navigate("/user")
    } catch (err) {
      console.error("Google sign-in failed:", err)
    }
  }

  const handlePhoneLogin = () => {
    // TODO: implement phone login flow
  }

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setFormData((prev) => ({ ...prev, otp: value }))
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: undefined }))
  }

  // Google Logo SVG Component
  const GoogleLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )

  const getSubtitle = () => {
    if (step === 1) {
      return phoneFlow 
        ? "Enter your phone number for verification" 
        : "Secure KYC verification platform for businesses"
    } else if (step === 2) {
      return "Create a secure password to protect your account"
    } else if (step === 3) {
      return `Verification code sent to ${formData.email}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
 <div className="text-center mb-8">
  {/* Logo Image */}
  <img
    src={logo} // <-- yaha apna logo path lagao (e.g. /assets/logo.png)
    alt="Verify E-KYC Logo"
    className="mx-auto w-20 h-20 object-contain mb-4"
  />

  {/* Company Name */}
  <h1 className="text-2xl font-bold text-gray-900 mb-2">
    <span className="text-green-600">Verify</span>{" "}
    <span className="text-blue-600">E-</span>
    <span className="text-orange-500">KYC</span>
  </h1>

  {/* Slogan */}
  <p className="text-sm text-gray-600">
    Trusted Verification <span className="text-blue-600">For A</span>{" "}
    <span className="text-orange-500">Digital World</span>
  </p>
</div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h2>
            <p className="text-sm text-gray-600">{getSubtitle()}</p>
          </div>

          {/* Back button */}
          {step > 1 && (
            <button 
              onClick={handleBack} 
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          )}

          {/* Progress indicator */}
          {!phoneFlow && (
            <div className="flex items-center mb-8">
              <div className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && !phoneFlow && (
              <div className="space-y-5">
                <FloatingLabel
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  error={errors.name}
                  icon={User}
                  type="text"
                  autoComplete="name"
                />

                <FloatingLabel
                  label="Email Address"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={errors.email}
                  icon={Mail}
                  type="email"
                  autoComplete="email"
                />

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Phone flow */}
            {step === 1 && phoneFlow && (
              <div className="space-y-5">
                <FloatingLabel
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  error={errors.phone}
                  icon={Phone}
                  type="tel"
                  autoComplete="tel"
                />
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                >
                  Send Verification Code
                </Button>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && !phoneFlow && (
              <div className="space-y-5">
                <FloatingLabel
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  error={errors.password}
                  icon={Lock}
                  type="password"
                  autoComplete="new-password"
                  showPassword={showPassword.password}
                  onTogglePassword={() => handleTogglePassword("password")}
                />

                <FloatingLabel
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  error={errors.confirmPassword}
                  icon={Lock}
                  type="password"
                  autoComplete="new-password"
                  showPassword={showPassword.confirmPassword}
                  onTogglePassword={() => handleTogglePassword("confirmPassword")}
                />

                <Button 
                  type="submit" 
                  disabled={isSigningUp} 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors"
                >
                  {isSigningUp ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            )}

            {/* Step 3: OTP Verification */}
            {step === 3 && !phoneFlow && (
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Verify Your Email</h3>
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit code we sent to your email address
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={handleOtpChange}
                      placeholder="000000"
                      className={`w-full h-14 text-center text-xl font-mono tracking-wider border rounded-md transition-colors ${
                        errors.otp 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      maxLength={6}
                      autoComplete="one-time-code"
                    />
                    {errors.otp && (
                      <p className="text-red-600 text-sm mt-2">{errors.otp}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isVerifyingOtp || formData.otp.length !== 6} 
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors"
                  >
                    {isVerifyingOtp ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                </div>

                {/* Resend OTP */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  {canResendOtp ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      Resend Code
                    </button>
                  ) : (
                    <p className="text-gray-500 text-sm">Resend in {otpTimer}s</p>
                  )}
                </div>
              </div>
            )}
          </form>

          {/* Show alternative sign-in options only on step 1 */}
          {step === 1 && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Alternative sign-in options */}
              <div className="space-y-3">
                {/* Google Sign-in */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-11 flex items-center justify-center border border-gray-300 hover:border-gray-400 rounded-md transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <GoogleLogo />
                      <span className="text-gray-700 font-medium">Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Phone option */}
                <button
                  onClick={() => { setPhoneFlow(true); setStep(1); setErrors({}) }}
                  className="w-full h-11 flex items-center justify-center border border-gray-300 hover:border-gray-400 rounded-md transition-colors bg-white hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700 font-medium">Continue with Phone</span>
                </button>
              </div>

              {/* Terms */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="https://e-kyc-eight.vercel.app/terms-and-condition" className="text-blue-600 hover:text-blue-700 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="https://e-kyc-eight.vercel.app/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </>
          )}

          {/* Login link */}
          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2024 VerifyeKYC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}