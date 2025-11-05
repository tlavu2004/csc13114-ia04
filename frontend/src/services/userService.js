import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const getUserProfile = async (axiosInstance) => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};
