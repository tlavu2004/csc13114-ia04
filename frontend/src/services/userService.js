import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};
