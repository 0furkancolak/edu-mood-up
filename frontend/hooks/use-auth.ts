"use client";

import { getUserSessionQueryFn } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
    throwOnError: (error) => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      throw error;
    }
  });

  return {
    ...query,
    isAuthenticated: !!query.data && query.isSuccess,
  };
};

export default useAuth;