import { useMutation } from "@tanstack/react-query";
import { promisifyMutation } from "@/frontend/helpers/promisifyMutation";
import { useSDK } from '@/frontend/hooks/useSDK';
import { User } from "@/core/types";

export function useUser() {
  const sdk = useSDK();

  const { mutate: signUp } = useMutation({
    mutationFn: (user: User)=> sdk.user.create(user),
  });

  return {
    signUp: promisifyMutation(signUp),
  }
}