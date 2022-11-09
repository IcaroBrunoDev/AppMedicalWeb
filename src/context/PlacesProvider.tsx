import React from "react";
import { AlertType } from "../interfaces/General";

import api from "../utils/axios";

import { useAlert } from "./AlertProvider";
import { useAuth } from "./AuthProvider";

interface PlacesContextInterface {
  locations: any[];
  selectedLocation: any;
  setSelectedLocation: (place: any) => void;
  handleAttendanceLocation: (place: any) => void;
}

const PlacesContext = React.createContext<PlacesContextInterface>(
  {} as PlacesContextInterface
);

export function PlacesProvider({ children }: any) {
  const { showAlert } = useAlert();
  const { isAuthenticated } = useAuth();

  const [locations, setLocations] = React.useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<any>();

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const { data } = await api.get("/places");

          if (data.response.length > 0) {
            setLocations(data.response);
            setSelectedLocation(data.response[0]?.location);
          }
        } catch (err) {
          showAlert({ open: true, type: AlertType.danger, message: "" });
        }
      })();
    }
  }, [isAuthenticated, showAlert]);

  const handleAttendanceLocation = (place: any) => {
    setSelectedLocation(place);
  };

  return (
    <PlacesContext.Provider
      value={{
        locations,
        selectedLocation,
        setSelectedLocation,
        handleAttendanceLocation,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  return React.useContext(PlacesContext);
}
