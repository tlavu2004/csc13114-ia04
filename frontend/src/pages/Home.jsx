import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-blue-700">
          Welcome to IA03 App
        </h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          A simple authentication demo using React.js + Nest.js
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </div>
    </div>
  );
}
