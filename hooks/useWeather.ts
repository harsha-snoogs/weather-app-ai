import { WeatherApiResponse } from "@/types/type";
import { useEffect, useState } from "react";

export default function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    if (city.length < 1) return;
    const controller = new AbortController();
    async function loadWeather() {
      setloading(true);
      const result = await fetch(`/api/weather?city=${city}`, {
        signal: controller.signal,
      });
      const response = await result.json();
      setWeather(response);
      setloading(false);
    }
    loadWeather();
    return () => {
      controller.abort();
    };
  }, [city]);

  return { weather, loading };
}
