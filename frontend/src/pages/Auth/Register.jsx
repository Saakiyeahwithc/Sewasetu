import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Briefcase,
  Loader2,
  User,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import { validateAvatar } from "../../utils/helper.js";
import { motion } from "framer-motion";
import { API_PATHS } from "../../utils/apiPaths.js";
import uploadImage from "../../utils/uploadImage.js";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Register() {
  const { login } = useAuth();
  const [role, setRole] = useState("jobseeker");
  const navigate = useNavigate();
  const hasShownToast = useRef(false); // Add this to prevent double toasts
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
    avatar: null,
    agreeToTerms: true, // Changed to false initially
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }));
  }, [role]);

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: false,
    success: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (formState.errors[field]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [field]: null },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));

      //Create Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
          errors: { ...prev.errors, avatar: "" },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // Frontend validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (formState.loading) return;

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }));
      toast.error("Please fix the form errors");
      return;
    }

    setFormState((prev) => ({ ...prev, loading: true, errors: {} }));

    try {
      let avatarUrl = "";

      //Upload url if present
      if (formData.avatar) {
        const imageUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imageUploadRes.imageUrl || "";
      }

      // Prepare data for API (exclude avatar file, include avatarUrl)
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl,
        agreeToTerms: formData.agreeToTerms,
      };

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        registrationData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //handle successful registration
      console.log("Registration response:", response.data);

      // Extract token and user data from the response structure
      const token = response.data.token;
      const user = response.data.data?.user || response.data.user;

      console.log("Extracted registration data:", { token, user }); // Debug log

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      if (user && token) {
        // Store user data in localStorage and update auth context
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        login(user, token);

        // Show success message
        toast.success(`Welcome ${user.name}! Redirecting to your dashboard...`);

        //redirect based on role after a short delay
        setTimeout(() => {
          const redirectPath =
            user.role === "employer"
              ? "/employerdashboard"
              : "/jobseekerdashboard";
          console.log(
            "Redirecting to:",
            redirectPath,
            "for user role:",
            user.role
          ); // Debug log
          navigate(redirectPath);
        }, 2000);
      } else {
        console.error(
          "Missing user data or token in registration response:",
          response.data
        );
        toast.error(
          "Registration successful but missing user data. Please try logging in."
        );
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      // Use a ref or flag to prevent double toast
      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.message === "Network Error") {
        errorMessage =
          "Cannot connect to server. Please check your connection.";
      }

      // Show toast only once
      toast.error(errorMessage);
      setFormState((prev) => ({
        ...prev,
        errors: error.response?.data?.errors || {},
      }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className="text-gray-600 md-4">
            Welcome to JobPortal! Your account has been succesfully created.
          </p>
          <Loader2 className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm texr-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-emerald-600 text-white hover:text-emerald-200 font-medium"
      >
        Back to home
      </Button>
      <Card className="w-full max-w-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-xl mt-10">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mt-3">
            <Briefcase className="w-8 h-8 text-white " />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Join thousands of users on{" "}
            <span className="font-semibold text-blue-600">Sewa Setu</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                I am a <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button" // FIXED: Added type="button"
                  onClick={() => setRole("jobseeker")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    role === "jobseeker"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Job Seeker</div>
                  <div className="text-sm opacity-75">Looking for work</div>
                </button>
                <button
                  type="button" // FIXED: Added type="button"
                  onClick={() => setRole("employer")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    role === "employer"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Briefcase className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Employer</div>
                  <div className="text-sm opacity-75">Hiring talent</div>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*Full Name*/}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formState.errors.name ? "border-red-500" : ""
                  }`}
                  required
                />
                {formState.errors.name && (
                  <p className="text-sm text-red-600">
                    {formState.errors.name}
                  </p>
                )}
              </div>
              {/*Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formState.errors.email ? "border-red-500" : ""
                  }`}
                  required
                />
                {formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {formState.errors.email}
                  </p>
                )}
              </div>
            </div>
            {/* Avatar Upload */}
            <div>
              <label
                className="block tect-sm font-medium text-gray-700 md-2"
                htmlFor="profile picture"
              >
                Profile picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {formState.avatarPreview ? (
                    <img
                      src={formState.avatarPreview}
                      alt="Avatar preview"
                      className=" w-full h-full object-cover "
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    id="avatar"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer bg-gray-50 border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG upto 5MB
                  </p>
                </div>
              </div>
            </div>

            {formState.errors.avatar && (
              <p className="text-red-500 text-sm mt-1 flex items-center ">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.avatar}
              </p>
            )}
            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formState.errors.password ? "border-red-500" : ""
                  }`}
                  required
                />
                {formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {formState.errors.password}
                  </p>
                )}
              </div>
              {/* Confirm PassWord*/}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formState.errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  required
                />
                {formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {formState.errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked)
                  }
                  className="mt-1"
                />
                <div
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              {formState.errors.agreeToTerms && (
                <p className="text-sm text-red-600">
                  {formState.errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formState.loading}
            >
              {formState.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                  Account...
                </>
              ) : (
                "Create your account"
              )}
            </button>
          </form>
          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer"
              >
                Sign in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
