import { Doctor } from "../interfaces/Doctors";
import { SessionToken } from "../interfaces/General";

export const storageSessionToken = (token: SessionToken) => {
  return sessionStorage.setItem("session", JSON.stringify(token));
};

export const getSessionToken = () => {
  const token = sessionStorage.getItem("session");
  return token ? JSON.parse(token) : null;
};

export const storageProfile = (profile: Doctor) => {
  return sessionStorage.setItem("profile", JSON.stringify(profile));
};

export const getStoragedProfile = () => {
  const profile = sessionStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

export const clearCache = () => {
  return sessionStorage.clear();
};
