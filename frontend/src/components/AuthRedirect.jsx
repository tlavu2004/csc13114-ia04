import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthProvider";

export default function AuthRedirect() {
  const { shouldRedirect, setShouldRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      setShouldRedirect(false);
      navigate("/login", { replace: true });
    }
  }, [shouldRedirect, setShouldRedirect, navigate]);

  return null;
}
