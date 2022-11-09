import React from "react";
import { Doctor } from "../interfaces/Doctors";
import { AlertType } from "../interfaces/General";

import api, { inteceptor } from "../utils/axios";

import {
  clearAllCaches,
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
  const alert = useAlert();

  const [profile, setProfile] = React.useState<Doctor | undefined>();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  enum Provider {
    doctor = "doctor",
  }

  React.useEffect(() => {
    const storagedToken = getSessionToken();
    const storageProfile = getStoragedProfile();

    if (storagedToken && storageProfile) {
      inteceptor();
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
      console.log(err);

      alert.showAlert({ open: true, type: AlertType.danger, message: "tete" });
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
      await api.delete("/signout");

      clearAllCaches();

      document.location.replace("/");
    } catch (err: any) {

      console.log(err)

      const { status } = err.response;

      if (status === 500) {
        clearAllCaches();

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
