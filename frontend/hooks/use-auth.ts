"use client";

import { getUserSessionQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const useAuth = () => {
  const accessToken = Cookies.get('accessToken');
  const enabled = !!accessToken;

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
    enabled: enabled,
  });

  return {
    ...query,
    isAuthenticated: enabled && !!query.data && query.isSuccess,
  };
};

export default useAuth;