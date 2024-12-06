"use client";

import { getUserSessionQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  return {
    ...query,
    isAuthenticated: !!query.data && query.isSuccess,
  };
};

export default useAuth;