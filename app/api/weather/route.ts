import { WeatherApiResponse } from "@/types/type";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const result = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.WEATHERAPP_API_KEY}`,
  );
  const response = await result.json();
  console.log(response);
  const place = response[0];
  if (!place) return;

  const { lat, lon } = place;
  const weatherResult = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHERAPP_API_KEY}&units=metric`,
  );
  const weatherResponse: WeatherApiResponse = await weatherResult.json();
  return Response.json(weatherResponse);
}
