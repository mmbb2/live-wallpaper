import WeatherCard from "../components/WeatherWidget/WeatherCard.tsx";
import { buildMockWeather } from "./weather.ts";

export default function WeatherCardTestGrid() {
  const temps = [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50];

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

  const testCases = weatherCodes.flatMap((w) =>
    temps.map((t) => ({
      temperature: t,
      weathercode: w.code,
      label: w.label,
    })),
  );

  return (
    <div className="min-h-screen p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testCases.map((t, i) => (
          <div key={i} className="space-y-2">
            {/* LABEL HEADER */}
            <div className="text-xs text-white/60">
              {t.weathercode} — {t.label} — {t.temperature}°
            </div>

            <WeatherCard
              data={buildMockWeather(t.temperature, t.weathercode)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
