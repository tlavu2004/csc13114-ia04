import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, refreshToken as refreshTokenService } from "../../services/authService";
import api from "../../services/api";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, accessToken: null });
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (storedRefresh) {
        try {
          const tokens = await refreshTokenService(storedRefresh);
          setAuth({ user: tokens.user, accessToken: tokens.accessToken });
        } catch {
          setAuth({ user: null, accessToken: null });
          localStorage.removeItem("refreshToken");
        }
      }
      setLoadingAuth(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const { accessToken, refreshToken, user } = await loginService({ email, password });
    setAuth({ user, accessToken });
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = async () => {
    try {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (storedRefresh) {
        await api.post("/auth/logout", { refreshToken: storedRefresh });
      }
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setAuth({ user: null, accessToken: null });
      localStorage.removeItem("refreshToken");
      setShouldRedirect(true);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loadingAuth, shouldRedirect, setShouldRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};
