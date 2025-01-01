import React, { createContext, ReactNode, useContext, useState } from "react";
// Create a context for the access token

interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

// Utility to get session items
const getSessionItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item === "undefined" || item === "NaN" ? null : item;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provide the context to the component tree
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(getSessionItem("access_token"));

  return <AuthContext.Provider value={{ accessToken, setAccessToken }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
