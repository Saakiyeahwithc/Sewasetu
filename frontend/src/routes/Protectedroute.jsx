import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  // Get user info from cookie
  const userCookie = Cookies.get("user");
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Invalid user cookie:", error);
    }
  }

  // If user Not registered → redirect to resgistation page
  if (!user) {
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
