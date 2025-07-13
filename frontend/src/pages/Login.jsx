import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Eye } from "lucide-react";
import Tabs, { TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeOff } from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <Tabs defaultValue="jobseeker" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="jobseeker"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger
                  value="employer"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Employer
                </TabsTrigger>
              </TabsList>

              {/* Job Seeker Login */}
              <TabsContent value="jobseeker">
                <CardContent className="space-y-6 p-0">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-black"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-12 px-4 pr-12 text-base border border-emerald-500 rounded-md shadow-sm bg-white text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-300 dark:text-white dark:border-emerald-700"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-black"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full h-12 px-4 pr-12 text-base border border-emerald-500 rounded-md shadow-sm bg-white text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-300 dark:text-white dark:border-emerald-700"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="/forgot-password"
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-medium">
                      Sign In as Job Seeker
                    </button>
                  </form>
                </CardContent>
              </TabsContent>

              {/* Employer Login */}
              <TabsContent value="employer">
                <CardContent className="space-y-6 p-0">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-black"
                      >
                        Company's Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-12 px-4 pr-12 text-base border border-blue-500 rounded-md shadow-sm bg-white text-blue-800  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-300 dark:text-white dark:border-blue-700"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-black"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full h-12 px-4 pr-12 text-base border border-blue-500 rounded-md shadow-sm bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-300 dark:text-white dark:border-blue-700"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium">
                      Sign In as Employer
                    </button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Sign Up a */}
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

        {/* Help Section */}
        <div className="text-center mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Need help getting started?
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="/help" className="text-emerald-600 hover:text-emerald-700">
              Help Center
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="/contact"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
