import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Fake delay to simulate API call
    setTimeout(() => {
      const result = validateLogin(email, password);
      if (result.valid) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.message);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-transparent border-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button type="submit">
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </form>

        {status === "success" && (
          <p className="text-green-600 mt-4 text-center">
            Logged in successfully (simulation)
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
