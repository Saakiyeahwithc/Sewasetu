import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  onLogout,
}) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
      >
        {avatar && avatar.trim() !== "" ? (
          <img
            src={avatar}
            alt="avatar"
            className="h-9 w-9 object-cover rounded-xl"
          />
        ) : (
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName ? companyName.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {companyName || "User"}
          </p>
          <p className="text-xs text-gray-500">
            {userRole === "jobseeker"
              ? "Job Seeker"
              : userRole === "employer"
              ? "Employer"
              : "User"}
          </p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-gray-100 py-2 z-50">
          <div className="px-4 py-5 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {companyName || "User"}
            </p>
            <p className="text-xs text-gray-500">{email || "No email"}</p>
          </div>

          <button
            onClick={() => {
              if (userRole === "jobseeker") {
                navigate(`/profile/${user?._id}`);
              } else {
                navigate("/company-profile");
              }
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Profile
          </button>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
