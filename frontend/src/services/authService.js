import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const refreshToken = async (refreshToken) => {
  const res = await api.post("/auth/refresh", { refreshToken });
  return res.data;
};

export const logout = async (refreshToken) => {
  await api.post("/auth/logout", { refreshToken });
};
