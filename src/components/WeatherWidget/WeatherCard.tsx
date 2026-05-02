import type { WeatherResponse } from "../../api/weather/getWeather.ts";
import { getWeatherDescription, getWeatherIcons } from "../../utils/weather.ts";
import { Loader2 } from "lucide-react";
import { useLocationsStore } from "../../store/useLocationsStore.ts";
import { getWeatherTheme } from "../../utils/weatherThere.ts";
type WeatherCardProps = {
  data: WeatherResponse;
  refetch?: () => void;
  isFetching?: boolean;
};

const WeatherCard = ({ data, refetch, isFetching }: WeatherCardProps) => {
  const { current_weather } = data;

  const theme = getWeatherTheme(
    current_weather.temperature,
    current_weather.weathercode,
    !!current_weather.is_day,
  );

  const formattedTime = new Date(current_weather.time + "Z").toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const icons = getWeatherIcons(current_weather.weathercode);

  const location = useLocationsStore((s) => s.location);

  const locationLabel = location
    ? `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}`
    : "No location selected";

  return (
    <div
      className="relative w-full rounded-3xl border p-6 text-white shadow-2xl backdrop-blur-xl select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor,
      }}
    >
      <div className="mb-4 text-xs text-white/50">{locationLabel}</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-6xl font-semibold tracking-tight">
            {Math.round(current_weather.temperature)}°
          </div>

          <div className="mt-1 text-sm text-white/70">
            {getWeatherDescription(current_weather.weathercode)}
          </div>
        </div>

        <div className="flex gap-1">
          {icons.map((Icon, i) => (
            <Icon key={i} className="h-12 w-12 opacity-90" />
          ))}
        </div>
      </div>
      <div className="mt-4 text-xs text-white/50">
        {current_weather.is_day ? "Daytime" : "Night"}
      </div>
      <div
        onClick={() => {
          if (refetch) {
            refetch();
          }
        }}
        className="mt-8 border-t border-white/10 pt-3 text-xs text-white/40 hover:underline cursor-pointer flex items-center gap-2"
      >
        <span>Last updated {formattedTime}</span>
        {isFetching && <Loader2 className="h-3 w-3 animate-spin" />}
      </div>
    </div>
  );
};

export default WeatherCard;
