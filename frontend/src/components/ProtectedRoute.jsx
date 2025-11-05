import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { auth, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!auth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
