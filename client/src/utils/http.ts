import { useQuery } from "react-query";
import useUserStore from "./useUser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchAuthenticated = <T = any[]>(
  path: string,
  { cacheKey }: { cacheKey: string }
): { data: T | undefined; isLoading: true } | { data: T; isLoading: false } => {
  const { userId } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: [cacheKey, userId],
    queryFn: () =>
      fetch(`http://localhost:3000${path}`, {
        headers: {
          "x-user-id": userId,
        },
      }).then((res) => res.json()),
  });

  return { data, isLoading };
};
