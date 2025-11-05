import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getUserProfile } from "../services/userService";

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return;
      try {
        const data = await getUserProfile(axiosPrivate);
        setUserProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [auth?.accessToken, axiosPrivate]);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4">
          Welcome, {userProfile?.email || "User"}!
        </h1>

        <p className="text-green-600 text-lg mb-6">
          You have logged in successfully.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-left">
          <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
            Your Profile
          </h2>
          <p>
            <span className="font-medium">User ID:</span> {userProfile?.id || "N/A"}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userProfile?.email || "N/A"}
          </p>
          <p>
            <span className="font-medium">Member since:</span>{" "}
            {userProfile?.createdAt
              ? new Date(userProfile.createdAt).toLocaleString("en-GB", {
                timeZone: "Asia/Ho_Chi_Minh",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
              : "N/A"}
          </p>
        </div>

        <Button onClick={handleLogout} className="w-full">
          Logout & Return Home
        </Button>
      </div>
    </div>
  );
}
