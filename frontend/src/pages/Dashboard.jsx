import { useAuth } from "../context/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  if (!auth?.accessToken) {
    // Dù route đã protected, check thêm để tránh lỗi
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/"); // quay về Home
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {auth.user?.email || "User"}!
        </h1>
        <p className="text-green-600 mb-6">Logged in successfully!</p>
        <Button onClick={handleLogout}>Logout & Return Home</Button>
      </div>
    </div>
  );
}
