export async function analyzeCity(city) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/weather/analyze?city=${city}`);
  if (!res.ok) {
    throw new Error("API Error");
  }
  return await res.json();
}