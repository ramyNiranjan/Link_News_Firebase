import { useContext } from "react";
import { authContext } from "../components/auth/AuthProvider";

export const useAuth = () => {
  return useContext(authContext);
};
