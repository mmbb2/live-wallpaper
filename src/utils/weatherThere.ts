type WeatherTheme = {
  backgroundColor: string;
  borderColor: string;
};

type WeatherKind =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "freezingDrizzle"
  | "rain"
  | "freezingRain"
  | "snow"
  | "snowGrains"
  | "rainShower"
  | "snowShower"
  | "thunderstorm"
  | "thunderstormHail";

function classifyWeather(code: number): WeatherKind {
  if (code === 0) return "clear";
  if (code >= 1 && code <= 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 55) return "drizzle";
  if (code === 56 || code === 57) return "freezingDrizzle";
  if (code >= 61 && code <= 65) return "rain";
  if (code === 66 || code === 67) return "freezingRain";
  if (code >= 71 && code <= 75) return "snow";
  if (code === 77) return "snowGrains";
  if (code >= 80 && code <= 82) return "rainShower";
  if (code === 85 || code === 86) return "snowShower";
  if (code === 95) return "thunderstorm";
  if (code === 96 || code === 99) return "thunderstormHail";
  return "clear";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function tempToHue(temp: number): number {
  const t = clamp(temp, -40, 50);

  // Normalise to 0..1: -40°C → 0, 50°C → 1
  const x = (t + 40) / 90;

  // Smoothstep (ease‑in‑out) – flat at ends, steep in the middle
  // This makes hue change very slowly below -20°C and above +35°C
  const eased = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // Hue range: 240 (deep blue, -40°C) → 0 (red, 50°C)
  // The S‑curve compresses changes at the extremes
  const hue = 240 - eased * 240;

  return Math.round(clamp(hue, 0, 360));
}

function getSaturation(kind: WeatherKind): number {
  switch (kind) {
    case "thunderstormHail":
      return 85;
    case "thunderstorm":
      return 80;
    case "freezingRain":
    case "rain":
    case "rainShower":
      return 70;
    case "freezingDrizzle":
    case "drizzle":
      return 60;
    case "snow":
    case "snowShower":
    case "snowGrains":
      return 55;
    case "cloudy":
      return 45;
    case "clear":
      return 40;
    case "fog":
      return 25;
    default:
      return 50;
  }
}

function getBaseLightness(kind: WeatherKind): number {
  switch (kind) {
    case "thunderstormHail":
    case "thunderstorm":
      return 18;
    case "fog":
      return 22;
    case "freezingRain":
    case "rain":
    case "rainShower":
      return 24;
    case "freezingDrizzle":
    case "drizzle":
      return 26;
    case "snow":
    case "snowShower":
    case "snowGrains":
      return 28;
    case "cloudy":
      return 30;
    case "clear":
      return 34;
    default:
      return 28;
  }
}

function adjustLightness(baseLight: number, isDay: boolean): number {
  if (isDay) {
    return clamp(baseLight + 8, 18, 70);
  } else {
    return clamp(baseLight - 5, 12, 60);
  }
}

function borderLightness(bgLight: number): number {
  return clamp(bgLight + 10, 30, 70);
}

function getBackgroundAlpha(kind: WeatherKind): number {
  switch (kind) {
    case "thunderstormHail":
    case "thunderstorm":
      return 0.22;
    case "freezingRain":
    case "rain":
    case "rainShower":
      return 0.16;
    case "fog":
      return 0.14;
    default:
      return 0.12;
  }
}

function getBorderAlpha(kind: WeatherKind): number {
  switch (kind) {
    case "thunderstormHail":
    case "thunderstorm":
      return 0.35;
    case "freezingRain":
    case "rain":
    case "rainShower":
      return 0.28;
    default:
      return 0.25;
  }
}

export function getWeatherTheme(
  tempCelsius: number,
  weatherCode: number,
  isDay: boolean = true,
): WeatherTheme {
  const kind = classifyWeather(weatherCode);
  const hue = tempToHue(tempCelsius);
  const saturation = getSaturation(kind);
  const baseLight = getBaseLightness(kind);
  const bgLight = adjustLightness(baseLight, isDay);
  const borderLight = borderLightness(bgLight);
  const bgAlpha = getBackgroundAlpha(kind);
  const borderAlpha = getBorderAlpha(kind);

  return {
    backgroundColor: `hsla(${hue}, ${saturation}%, ${bgLight}%, ${bgAlpha})`,
    borderColor: `hsla(${hue}, ${saturation}%, ${borderLight}%, ${borderAlpha})`,
  };
}
