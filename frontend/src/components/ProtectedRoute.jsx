import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (!auth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
