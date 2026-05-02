import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getWeather, type WeatherResponse } from "../api/weather/getWeather.ts";

type UseWeatherOptions = Omit<
  UseQueryOptions<WeatherResponse>,
  "queryKey" | "queryFn"
>;

export function useWeather(
  latitude?: number,
  longitude?: number,
  options?: UseWeatherOptions,
) {
  return useQuery({
    queryKey: ["weather", latitude, longitude] as const,
    queryFn: () => {
      if (!latitude || !longitude) {
        throw new Error("Latitude and longitude are mandatory");
      }
      return getWeather(latitude, longitude);
    },
    ...options,
  });
}
