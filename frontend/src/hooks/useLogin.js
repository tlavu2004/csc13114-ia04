import { useMutation } from "@tanstack/react-query";
import { login as loginService } from "../services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) => loginService({ email, password }),
  });
};
