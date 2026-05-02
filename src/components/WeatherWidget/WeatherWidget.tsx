import { useWeather } from "../../hooks/useWeather.ts";
import WeatherCard from "./WeatherCard.tsx";
import WeatherSkeleton from "./WeatherSkeleton.tsx";
import { Dialog, DialogTrigger } from "../ui/dialog.tsx";
import { Settings } from "lucide-react";
import SettingsDialogContent from "./SettingsDialogContent.tsx";
import { useLocationsStore } from "../../store/useLocationsStore.ts";

const WeatherWidget = () => {
  const location = useLocationsStore((s) => s.location);

  const enabled = !!location;

  const {
    data: weather,
    isLoading,
    refetch,
    isFetching,
  } = useWeather(location?.latitude, location?.longitude, { enabled });

  return (
    <div className="relative w-full max-w-md">
      <Dialog>
        <DialogTrigger asChild>
          <button className="z-10 cursor-pointer absolute right-2 top-2 rounded-full bg-white/10 p-2 hover:bg-white/20 transition">
            <Settings className="h-4 w-4 text-white" />
          </button>
        </DialogTrigger>

        <SettingsDialogContent />
      </Dialog>
      {isLoading || !weather ? (
        <WeatherSkeleton />
      ) : (
        <WeatherCard data={weather} refetch={refetch} isFetching={isFetching} />
      )}
    </div>
  );
};

export default WeatherWidget;
