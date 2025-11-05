import { useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/auth/AuthProvider";
import { refreshToken as refreshTokenService } from "../services/authService";

const useAxiosPrivate = (navigate) => {
  const { auth, setAuth, logout } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;
          const storedRefresh = localStorage.getItem("refreshToken");
          if (storedRefresh) {
            try {
              const newTokens = await refreshTokenService(storedRefresh);
              setAuth((prev) => ({ ...prev, accessToken: newTokens.accessToken }));
              prevRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return api(prevRequest);
            } catch {
              logout(navigate);
            }
          } else {
            logout(navigate);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth, logout, navigate]);

  return api;
};

export default useAxiosPrivate;
