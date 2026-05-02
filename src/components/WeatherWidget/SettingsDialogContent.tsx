import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useLocationsSearch } from "../../hooks/useLocationsSearch.ts";
import { useLocationsStore } from "../../store/useLocationsStore.ts";

const SettingsDialogContent = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);

  const { data: locations, isFetching: isLocationsFetching } =
    useLocationsSearch(debouncedQuery);

  const location = useLocationsStore((s) => s.location);
  const setLocation = useLocationsStore((s) => s.setLocation);

  return (
    <DialogContent className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-xl">
      <DialogHeader>
        <DialogTitle className="text-sm">Select location</DialogTitle>
      </DialogHeader>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="mt-3 w-full rounded-lg bg-white/10 px-3 py-2 text-sm outline-none"
      />

      {isLocationsFetching && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
          <Loader2 className="h-3 w-3 animate-spin" />
          Searching...
        </div>
      )}

      <div className="mt-3 max-h-60 space-y-1 overflow-auto">
        {locations?.map((loc) => {
          const selected = location?.id === loc.id;

          return (
            <button
              key={loc.id}
              onClick={() => {
                setLocation(loc);
                console.log("Selected:", loc);
              }}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition
          ${
            selected
              ? "bg-white/20 text-white"
              : "bg-white/5 hover:bg-white/10 text-white/80"
          }`}
            >
              {loc.name}, {loc.admin1 ? `${loc.admin1}, ` : ""}
              {loc.country}
              {selected && (
                <span className="ml-2 text-xs text-white/50">(active)</span>
              )}
            </button>
          );
        })}
      </div>
    </DialogContent>
  );
};

export default SettingsDialogContent;
