import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/user/register`, data);
  return res.data;
};
