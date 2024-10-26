/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "react-query";
import useUserStore from "./useUser";

const API_URL = "http://localhost:3000";
export const useGetAuthenticated = <T = any[]>(
  path: string,
  { cacheKey }: { cacheKey: string }
): { data: T | undefined; isLoading: true } | { data: T; isLoading: false } => {
  const { userId } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: [cacheKey, userId],
    queryFn: () =>
      fetch(`${API_URL}${path}`, {
        headers: {
          "x-user-id": userId,
        },
      }).then((res) => res.json()),
  });

  return { data, isLoading };
};

export const usePostAuthenticated = <T = any, R = any>(
  path: string,
  { invalidateKey }: { invalidateKey: string }
) => {
  const { userId } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation<R, Error, T>({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateKey, userId] });
    },
    mutationFn: (data) =>
      fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  });
};

export const usePutAuthenticated = <T = any, R = any>(
  path: string,
  { invalidateKey }: { invalidateKey: string }
) => {
  const { userId } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation<R, Error, T>({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateKey, userId] });
    },
    mutationFn: (data) =>
      fetch(`${API_URL}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  });
};
