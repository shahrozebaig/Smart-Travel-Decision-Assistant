export async function analyzeCity(city) {
  const res = await fetch(`https://smart-travel-decision-assistant.onrender.com/api/v1/weather/analyze?city=${city}`);
  if (!res.ok) {
    throw new Error("API Error");
  }
  return await res.json();
}