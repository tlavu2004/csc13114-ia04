import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import Input from "../components/Input";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { isValidEmail, isStrongPassword } from "../utils/validators";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { submitRegister, isLoading, isError, isSuccess, error } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const password = watch("password");

  const onSubmit = (data) => {
    const { confirmPassword, ...payload } = data;
    submitRegister(payload, {
      onSuccess: () => {
        setShowSuccess(true);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <BackButton to="/" />
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            {...register("email", {
              required: "Email is required",
              validate: (v) => isValidEmail(v) || "Invalid email format"
            })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                validate: (password) => isStrongPassword(password) ||
                  "Password must be 8-128 chars with upper, lower, number & special"
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (v) =>
                  v === password || "Passwords do not match",
              })}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          <Button type="submit" className="mt-2">
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        {isError && (
          <p className="text-red-600 mt-4 text-center">
            {error?.formattedMessage ||
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"}
          </p>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

          <div className="relative bg-white border-2 border-blue-500 text-blue-700 px-8 py-6 rounded-xl shadow-lg text-center w-96">
            <p className="text-xl font-semibold mb-4">
              Registration Successful!
            </p>
            <p className="mb-6 text-blue-800">
              Your account has been created. Please proceed to login.
            </p>
            <Button onClick={() => navigate("/login")} className="w-full text-lg">
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
