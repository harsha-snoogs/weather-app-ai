"use client";
import { useState } from "react";
import useDebouce from "@/hooks/useDebouce";
import useWeather from "@/hooks/useWeather";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const city = useDebouce(input, 1000);
  const { weather, loading } = useWeather(city);

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    let value = e.target.value;
    setInput(value);
  }

  const weatherText = `${weather?.main?.temp}°, ${weather?.weather?.[0]?.["description"] ?? ""}`;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center pt-16 px-16 bg-white dark:bg-black gap-3">
        <h1 className="text-4xl font-bold">
          Get forecast for your region !!!{" "}
        </h1>
        <div>
          Enter the city:
          <input
            type="text"
            className="border rounded ml-2 p-2"
            value={input}
            onChange={handleTextChange}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="">{city ? weatherText : ""}</div>
        )}
      </main>
    </div>
  );
}
