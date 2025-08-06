
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom" // Added useNavigate
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, CheckCircle, User, Mail, Phone, MapPin, Shield } from "lucide-react"
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "customer", // Default role
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError(null);
    setSignupSuccess(false);

    if (!acceptTerms) {
      setSignupError("You must agree to the terms and conditions");
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:3000/api/users/save-user", formData);

      if (response.data.success) {
        console.log("User registered successfully:", response.data);
        setSignupSuccess(true);

        // Redirect after a short delay to allow success message to be seen
        setTimeout(() => {
          navigate('/signin'); // Redirect to the sign-in page
        }, 2000); // 2-second delay

        // Reset form (optional, as page will redirect)
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          role: "customer",
        })
        setAcceptTerms(false)
      } else {
        setSignupError(response.data.message || "Signup failed. Please try again.");
        console.error("Signup failed (backend response):", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Signup failed (Axios error):", error.response?.data || error.message);
        setSignupError(error.response?.data?.message || error.message || "Network error. Please try again.");
      } else {
        console.error("Signup failed (unexpected error):", error);
        setSignupError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false)
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

            {/* Page Header */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Create Account</h1>
              <p className="text-slate-600 text-lg">Join C-Mobiles for exclusive deals and premium service</p>
            </div>

            {/* Sign Up Form */}
            <Card className="border border-slate-200/50 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="pb-8 pt-8 text-center">
                <h2 className="text-2xl font-semibold text-slate-900">Sign Up</h2>
                <p className="text-slate-500 mt-2">Fill in your details to get started</p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {signupSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <strong className="font-bold">Success!</strong>
                      <span className="block sm:inline ml-2">Your account has been created. Redirecting to sign in...</span>
                    </div>
                )}
                {signupError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline ml-2">{signupError}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-12 pl-12"
                          required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12 pl-12"
                          required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-12 pl-12"
                          required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-3">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="address"
                          type="text"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="h-12 pl-12"
                          required
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-3">
                    <Label htmlFor="role">Account Type</Label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                      <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                        <SelectTrigger className="h-12 pl-12">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="reseller">Reseller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-3">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="h-12 pl-12 pr-12"
                          required
                      />
                      <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Password must be at least 8 characters with letters and numbers
                    </p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the{" "}
                      <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full h-12 mt-4 bg-black text-white hover:bg-gray-800" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-slate-500">Already have an account?</span>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                  <Link
                      to="/signin"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-lg"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                By creating an account, you'll get access to exclusive deals, order tracking, and personalized
                recommendations from C-Mobiles.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}