// hooks/useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/auth/AuthProvider";

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
      queryClient.clear();
    },
  });
}
