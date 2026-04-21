import requests,time
from utils.config import WEATHER_API_KEY
def get_weather(city:str):
    current_url="https://api.openweathermap.org/data/2.5/weather"
    forecast_url="https://api.openweathermap.org/data/2.5/forecast"
    for attempt in range(2):
        try:
            current_res=requests.get(current_url,params={"q":city,"appid":WEATHER_API_KEY,"units":"metric"},timeout=10)
            current_res.raise_for_status()
            current_data=current_res.json()
            forecast_res=requests.get(forecast_url,params={"q":city,"appid":WEATHER_API_KEY,"units":"metric"},timeout=10)
            forecast_res.raise_for_status()
            forecast_data=forecast_res.json()
            morning,afternoon,evening=[],[],[]
            for item in forecast_data.get("list",[]):
                hour=int(item["dt_txt"].split(" ")[1].split(":")[0])
                temp=item["main"]["temp"]
                if 6<=hour<12:morning.append(temp)
                elif 12<=hour<17:afternoon.append(temp)
                elif 17<=hour<22:evening.append(temp)
            def avg(lst):return round(sum(lst)/len(lst),2) if lst else None
            trend={"morning":avg(morning),"afternoon":avg(afternoon),"evening":avg(evening)}
            return{
                "city":city,
                "temperature":current_data.get("main",{}).get("temp"),
                "humidity":current_data.get("main",{}).get("humidity"),
                "wind_speed":current_data.get("wind",{}).get("speed"),
                "condition":current_data.get("weather",[{}])[0].get("main"),
                "trend":trend
            }
        except requests.exceptions.Timeout:
            time.sleep(1)
        except Exception as e:
            raise Exception(f"Weather API error: {str(e)}")
    raise Exception("Weather API timeout after retry.")