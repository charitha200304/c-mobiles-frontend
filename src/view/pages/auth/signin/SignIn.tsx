"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Smartphone, ArrowLeft, Mail, Shield, LogIn } from "lucide-react"
import axios from "axios"

export default function SignInPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!BACKEND_API_URL) {
      setErrorMessage("Backend API URL is not configured. Check your .env file.");
      return;
    }

    setIsLoading(true)
    try {
      const response = await axios.post(`${BACKEND_API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log('Full login response:', response);
        console.log('Response data:', response.data);
        
        const { accessToken, refreshToken, data } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Store user data including role - handle nested existingUser object
        const userData = data?.existingUser || data?.result?.existingUser || response.data?.data?.existingUser;
        if (userData) {
          console.log('User data from login:', userData);
          console.log('User role:', userData.role);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        setSuccessMessage("Login successful! Redirecting...");
        console.log("Login successful:", response.data);

        setTimeout(() => {
          // Get user data from nested existingUser object
          const userData = data?.existingUser || data?.result?.existingUser || response.data?.data?.existingUser;
          console.log('User data for redirection:', userData);
          
          // Check role and redirect accordingly
          const userRole = userData?.role?.toLowerCase();
          console.log('User role for redirection:', userRole);
          
          if (userRole === 'admin') {
            console.log('Redirecting to admin dashboard');
            navigate("/admin/dashboard");
          } else {
            console.log('Redirecting to home page');
            navigate("/");
          }
        }, 1500);

      } else {
        setErrorMessage(response.data.message || "An unexpected error occurred.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else if (error.message) {
          setErrorMessage("Login failed: " + error.message);
        } else {
          setErrorMessage("An unexpected network error occurred.");
        }
      } else {
        setErrorMessage("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-lg mx-auto">
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-all duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-wide">Back to Home</span>
            </Link>

            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <LogIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
              <p className="text-slate-600 text-lg">Sign in to your C-Mobiles account</p>
            </div>

            {/* Sign In Form */}
            <Card className="border border-slate-200/50 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="pb-8 pt-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-slate-900">Sign In</h2>
                  <p className="text-slate-500 mt-2">Enter your credentials to continue</p>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message Display */}
                  {errorMessage && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{errorMessage}</span>
                      </div>
                  )}
                  {/* Success Message Display */}
                  {successMessage && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success:</strong>
                        <span className="block sm:inline ml-2">{successMessage}</span>
                      </div>
                  )}

                  {/* Email */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12 pl-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 text-slate-900"
                          required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                      Password
                    </Label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="h-12 pl-12 pr-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 text-slate-900"
                          required
                      />
                      <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300"
                          onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 mt-8"
                  >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </div>
                    ) : (
                        "Sign In"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-slate-500">or</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                  <Link
                      to="/signup"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-lg"
                  >
                    Create a new account
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                Access your account to view orders, track shipments, and enjoy exclusive member benefits at C-Mobiles.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}