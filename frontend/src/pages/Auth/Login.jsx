import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Tabs, { TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { API_PATHS } from "../../utils/apiPaths";
export function Login() {
  const [activeTab, setActiveTab] = useState("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    success: false,
  });

  // Reset form fields and errors when switching tabs
  useEffect(() => {
    setEmail("");
    setPassword("");
    setFormState({ loading: false, errors: {}, success: false });
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ loading: true, errors: {}, success: false });

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password,
        rememberMe: rememberMe,
        role: activeTab, // Explicitly send the role
      });

      console.log("Full API response:", res.data); // Debug log

      // Extract token and user data based on actual response structure
      const token =
        res.data.token || res.data.accessToken || res.data.authToken;
      const user = res.data.user || res.data;
      const role = user.role;

      console.log("Extracted data:", { token, role, user }); // Debug log

      if (user && role) {
        // If no token, we'll proceed anyway since user data exists
        if (token) {
          login(user, token);
          localStorage.setItem("token", token);
          Cookies.set("token", token, { expires: rememberMe ? 7 : undefined });
        } else {
          console.warn("No token received from backend");
          login(user, null);
        }

        // Set cookies AND localStorage for consistency
        Cookies.set("user", JSON.stringify(user), {
          expires: rememberMe ? 7 : undefined,
        });
        localStorage.setItem("user", JSON.stringify(user));

        //Redirect based on role immediately
        const redirectPath =
          role === "employer" ? "/employerdashboard" : "/jobseekerdashboard";
        console.log("Redirecting to:", redirectPath); // Debug log
        console.log("Navigate function:", navigate); // Debug log

        // Navigate immediately instead of showing success screen
        try {
          navigate(redirectPath);
          console.log("Navigate called successfully"); // Debug log
        } catch (error) {
          console.error("Navigate failed:", error); // Debug log
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      const fieldErrors = error.response?.data?.errors || {};

      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          general:
            !fieldErrors.email && !fieldErrors.password
              ? errorMessage
              : undefined,
          email: fieldErrors.email,
          password: fieldErrors.password,
          ...fieldErrors,
        },
      }));
    } finally {
      // Ensure loading is set to false even if there's an unhandled error
      setFormState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const renderFormFields = (userType) => {
    const isJobSeeker = userType === "jobseeker";
    const accentColor = isJobSeeker ? "emerald" : "blue";
    const buttonText = isJobSeeker
      ? "Sign In as Job Seeker"
      : "Sign In as Employer";
    const emailLabel = isJobSeeker ? "Email Address" : "Company Email Address";

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* General Error Message */}
        {formState.errors.general && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <p>{formState.errors.general}</p>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor={`${userType}-email`}
            className="text-sm font-medium text-gray-800"
          >
            {emailLabel}
          </label>
          <input
            id={`${userType}-email`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-12 px-4 text-base border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-100 dark:text-black dark:border-gray-300 border-${accentColor}-300 text-gray-800 focus:ring-${accentColor}-500`}
            required
            disabled={formState.loading}
          />
          {formState.errors.email && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <p>{formState.errors.email}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`${userType}-password`}
            className="text-sm font-medium text-gray-800"
          >
            Password
          </label>
          <div className="relative">
            <input
              id={`${userType}-password`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full h-12 px-4 pr-12 text-base border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-100 dark:text-black dark:border-gray-300 border-${accentColor}-300 text-gray-800 focus:ring-${accentColor}-500`}
              required
              disabled={formState.loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              disabled={formState.loading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {formState.errors.password && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <p>{formState.errors.password}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              disabled={formState.loading}
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className={`text-sm text-${accentColor}-600 hover:text-${accentColor}-700`}
          >
            Forgot password?
          </a>
        </div>

        <button
          className={`w-full h-12 flex items-center justify-center rounded-md text-white text-base font-medium bg-${accentColor}-600 hover:bg-${accentColor}-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed`}
          type="submit"
          disabled={formState.loading}
        >
          {formState.loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>
    );
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
            Welcome Back!
          </h2>
          <p className="text-gray-600 md-4">You have successfully logged in.</p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto">
            <p className="text-sm texr-gray-500 mt-2">
              Redirecting to your dashboard...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-emerald-600 text-white hover:text-emerald-200 font-medium"
      >
        Back to Home
      </Button>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your account to continue.
          </p>
        </div>

        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="jobseeker"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" /> Job Seeker
                </TabsTrigger>
                <TabsTrigger
                  value="employer"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" /> Employer
                </TabsTrigger>
              </TabsList>
              <TabsContent value="jobseeker">
                {renderFormFields("jobseeker")}
              </TabsContent>
              <TabsContent value="employer">
                {renderFormFields("employer")}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {"Don't have an account? "}
            <a
              href="/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
