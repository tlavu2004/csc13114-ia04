import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/userService";

export function useRegister() {
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration success:", data);
    },
    onError: (err) => {
      console.error("Registration error:", err);

      let message = "Something went wrong";
      if (err.response?.data?.message) {
        message = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      err.formattedMessage = message;
    },
  });

  const submitRegister = (data) => {
    console.log("Registering:", data);
    mutation.mutate(data);
  };

  return { ...mutation, submitRegister };
}
