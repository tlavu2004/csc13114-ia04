import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/userService";

export function useRegister() {
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables, context) => {
      console.log("Registration success:", data);
      if (context?.onSuccess) {
        context.onSuccess(data);
      }
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

  const submitRegister = (data, options) => {
    console.log("Registering:", data);
    mutation.mutate(data, options);
  };

  return { ...mutation, submitRegister };
}
