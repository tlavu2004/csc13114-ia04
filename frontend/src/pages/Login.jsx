import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/auth/AuthProvider";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const { user, accessToken, refreshToken } = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      setAuth({ user, accessToken });
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard", { state: { message: "Logged in successfully!" } });
    } catch (err) {
      console.error(err);

      // Reset password field
      resetField("password");

      // Set focus to password input
      setFocus("password");

      // Optional: show mutation error
      setError("password", {
        type: "manual",
        message:
          err?.response?.data?.message || err.message || "Login failed",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <BackButton to="/" />
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
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
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <Button type="submit" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
