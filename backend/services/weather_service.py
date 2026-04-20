import requests
import time
from utils.config import WEATHER_API_KEY
def get_weather(city: str):
    url = "https://api.openweathermap.org/data/2.5/weather"
    for attempt in range(2): 
        try:
            response = requests.get(
                url,
                params={
                    "q": city,
                    "appid": WEATHER_API_KEY,
                    "units": "metric"
                },
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            return {
                "city": city,
                "temperature": data.get("main", {}).get("temp"),
                "humidity": data.get("main", {}).get("humidity"),
                "wind_speed": data.get("wind", {}).get("speed"),
                "condition": data.get("weather", [{}])[0].get("main")
            }
        except requests.exceptions.Timeout:
            print(f"Retrying... attempt {attempt+1}")
            time.sleep(1)
        except Exception as e:
            raise Exception(f"Weather API error: {str(e)}")
    raise Exception("Weather API timeout after retry.")