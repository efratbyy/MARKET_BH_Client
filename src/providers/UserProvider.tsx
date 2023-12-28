import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  SetStateAction,
  ReactNode,
} from "react";
import {
  getToken,
  getUserFromLocalStorage,
} from "../services/LocalStorageService";
import { TokenType } from "../types/userTypes";

type ContextArgs = {
  user: null | TokenType;
  setUser: (value: SetStateAction<null | TokenType>) => void;
  token: null | string;
  setToken: (value: SetStateAction<null | string>) => void;
  isLoading: boolean;
};

const UserContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<null | TokenType>(null);
  const [token, setToken] = useState<null | string>(getToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      const userFromLocalStorage = getUserFromLocalStorage();
      setUser(userFromLocalStorage);
      setIsLoading(false);
    }
  }, [user]);

  const value = useMemo(() => {
    return { user, setUser, token, setToken, isLoading };
  }, [user, token, isLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default UserProvider;
