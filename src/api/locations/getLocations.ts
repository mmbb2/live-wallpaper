export type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
};

export type GeocodingResponse = {
  results?: Location[];
};

export async function getLocations(query: string): Promise<Location[]> {
  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "en",
    format: "json",
  });

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data: GeocodingResponse = await res.json();

  return data.results ?? [];
}
