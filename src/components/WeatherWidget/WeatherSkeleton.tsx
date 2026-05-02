const WeatherSkeleton = () => {
  return (
    <div className="w-full rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 animate-pulse">
      {/* Top section */}

      <div className="flex items-center justify-between">
        <div>
          <div className="h-16 w-24 rounded-lg bg-white/10" />
          <div className="mt-3 h-3 w-32 rounded bg-white/10" />
        </div>

        <div className="h-12 w-12 rounded bg-white/10" />
      </div>

      {/* Middle */}
      <div className="mt-6 h-3 w-20 rounded bg-white/10" />

      {/* Footer */}
      <div className="mt-8 border-t border-white/10 pt-3">
        <div className="h-3 w-40 rounded bg-white/10" />
      </div>
    </div>
  );
};

export default WeatherSkeleton;
