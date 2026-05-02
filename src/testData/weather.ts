import type { WeatherResponse } from "../api/weather/getWeather.ts";

const weatherCodes = [
  { code: 0, label: "Clear sky" },

  { code: 1, label: "Mainly clear" },
  { code: 2, label: "Partly cloudy" },
  { code: 3, label: "Overcast" },

  { code: 45, label: "Fog" },
  { code: 48, label: "Rime fog" },

  { code: 51, label: "Light drizzle" },
  { code: 53, label: "Moderate drizzle" },
  { code: 55, label: "Dense drizzle" },

  { code: 56, label: "Light freezing drizzle" },
  { code: 57, label: "Dense freezing drizzle" },

  { code: 61, label: "Slight rain" },
  { code: 63, label: "Moderate rain" },
  { code: 65, label: "Heavy rain" },

  { code: 66, label: "Light freezing rain" },
  { code: 67, label: "Heavy freezing rain" },

  { code: 71, label: "Slight snow fall" },
  { code: 73, label: "Moderate snow fall" },
  { code: 75, label: "Heavy snow fall" },

  { code: 77, label: "Snow grains" },

  { code: 80, label: "Slight rain showers" },
  { code: 81, label: "Moderate rain showers" },
  { code: 82, label: "Violent rain showers" },

  { code: 85, label: "Slight snow showers" },
  { code: 86, label: "Heavy snow showers" },

  { code: 95, label: "Thunderstorm" },
  { code: 96, label: "Thunderstorm + hail (light)" },
  { code: 99, label: "Thunderstorm + hail (heavy)" },
];
const temps = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35];

export const testCases = weatherCodes.flatMap((w) =>
  temps.map((t) => ({
    temperature: t,
    weathercode: w.code,
    label: w.label,
  })),
);

export function buildMockWeather(temp: number, code: number): WeatherResponse {
  return {
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: "Europe/London",
    timezone_abbreviation: "GMT",
    elevation: 0,
    current_weather_units: {
      time: "iso8601",
      interval: "seconds",
      temperature: "°C",
      windspeed: "km/h",
      winddirection: "°",
      is_day: "",
      weathercode: "wmo code",
    },
    current_weather: {
      time: new Date().toISOString(),
      interval: 900,
      temperature: temp,
      windspeed: 10,
      winddirection: 0,
      is_day: 1,
      weathercode: code,
    },
  };
}
