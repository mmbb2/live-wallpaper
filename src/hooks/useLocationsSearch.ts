import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../api/locations/getLocations.ts";

export function useLocationsSearch(query: string) {
  return useQuery({
    queryKey: ["locations", query],
    queryFn: () => getLocations(query),
    enabled: query.length > 2,
  });
}
