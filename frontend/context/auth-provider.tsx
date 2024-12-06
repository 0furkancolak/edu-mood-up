"use client";

import useAuth from "@/hooks/use-auth";
import { UserDTO } from "@/types";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  user?: UserDTO;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch, isAuthenticated } = useAuth();
  const user = data?.data?.user || null;

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
