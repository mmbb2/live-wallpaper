import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Location } from "../api/locations/getLocations.ts";

interface LocationsStore {
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

export const useLocationsStore = create<LocationsStore>()(
  persist(
    (set) => ({
      location: null,

      setLocation: (location) =>
        set(() => ({
          location,
        })),

      clearLocation: () =>
        set(() => ({
          location: null,
        })),
    }),
    {
      name: "location-store",
    },
  ),
);
