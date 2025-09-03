import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // Get user info from localStorage (consistent with AuthContext)
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  let user = null;

  if (userStr && token) {
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error("Invalid user data:", error);
    }
  }

  // If user Not registered → redirect to registration page
  if (!user || !token) {
    return <Navigate to="/register" replace />;
  }

  // If role not allowed → redirect to login
  if (allowedRoles && user.role !== allowedRoles) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If everything is fine, render children (nested routes)
  return <Outlet />;
};

export default ProtectedRoute;
