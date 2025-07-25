import { Users, Briefcase } from "lucide-react";
import Toast from "../components/ui/Toast";
import { showToast } from "../components/ui/Toast";
import { useState } from "react";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors] = useState({});
  const [isSubmitting] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3️⃣ submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // rudimentary client‑side check
    if (formData.password !== formData.confirm) {
      showToast({ message: "Passwords do not match", type: "error" });
      return;
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.includes("@") &&
    formData.password.length >= 6 &&
    formData.password === formData.confirm;

  const [showPassword] = useState(false);

  const [userType, setUserType] = useState("jobseeker"); // default type

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  // Simulate a redirect after account creation
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {showToast && (
        <Toast
          message="Account created successfully! Redirecting..."
          type="success"
          onClose={() => showToast(false)}
        />
      )}

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section - Desktop Only */}
        <div className="hidden lg:block space-y-6 animate-in slide-in-from-left duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Join <span className="text-emerald-600">Sewa Setu</span>
            </h1>
            <p className="text-xl text-gray-600">
              Connecting talent with opportunities across Nepal's communities
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">For Job Seekers</h3>
                <p className="text-sm text-gray-600">
                  Find local opportunities in your community
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">For Employers</h3>
                <p className="text-sm text-gray-600">
                  Connect with local talent at affordable rates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-md mx-auto animate-in slide-in-from-right duration-700">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join thousands of users on Sewa Setu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                placeholder="Enter your full name"
              />

              <input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="Enter your email address"
              />

              <input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Create a strong password"
              />

              <input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
              />

              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  I am a <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("jobseeker")}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      userType === "jobseeker"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">Job Seeker</div>
                    <div className="text-xs text-gray-500">
                      Looking for work
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("employer")}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      userType === "employer"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Briefcase className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">Employer</div>
                    <div className="text-xs text-gray-500">Hiring talent</div>
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isFormValid && !isSubmitting
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
