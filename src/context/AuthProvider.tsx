import React from "react";
import { Doctor } from "../interfaces/Doctors";
import { AlertType, Providers } from "../interfaces/General";

import api, { inteceptor } from "../utils/axios";

import {
  clearCache,
  getSessionToken,
  getStoragedProfile,
  storageProfile,
  storageSessionToken,
} from "../utils/caches";
import { useAlert } from "./AlertProvider";

interface UserCredentials {
  email: string;
  password: string;
}

interface AuthProviderInterface {
  isAuthenticated: boolean;
  authenticate: (credentials: UserCredentials) => Promise<any>;
  logout: () => void;
  profile: Doctor | undefined;
}

const AuthContext = React.createContext<AuthProviderInterface>(
  {} as AuthProviderInterface
);

export function AuthProvider({ children }: any) {
  const { showAlert } = useAlert();

  const [profile, setProfile] = React.useState<Doctor>({} as Doctor);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  enum Provider {
    doctor = "doctor",
  }

  React.useEffect(() => {
    const storagedToken = getSessionToken();
    const storageProfile = getStoragedProfile();

    if (storagedToken && storageProfile) {
      inteceptor();
      setProfile(storageProfile);

      setIsAuthenticated(true);

      document.location.assign("/#/admin/agenda");
    }
  }, []);

  const authenticate = async (credentials: UserCredentials) => {
    const { email, password } = credentials;

    try {
      const { data } = await api.post("/signin", {
        login: email,
        password,
        provider: Provider.doctor,
      });

      const { token } = data.response;

      const user: Doctor | boolean = await getProfile(token);

      if (typeof user !== "boolean") {
        storageProfile(user);
        storageSessionToken(data.response);

        setProfile(user);
        setIsAuthenticated(true);

        return true;
      }

      throw new Error("Error, it was not possible to obtain the perfil");
    } catch (err) {
      showAlert({ open: true, type: AlertType.danger, message: "tete" });
    }
  };

  const getProfile = async (token: string) => {
    try {
      const { data } = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.response[0];
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/signout", {
        provider: Providers.doctor,
      });

      clearCache();

      document.location.replace("/");
    } catch (err: any) {
      const { status } = err.response;

      if (status === 500) {
        clearCache();
        document.location.replace("/");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ profile, isAuthenticated, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
