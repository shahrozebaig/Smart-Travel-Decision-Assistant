import requests,json,re
from utils.config import GROQ_API_KEY
def extract_json(text:str):
    match=re.search(r"\{.*\}",text,re.DOTALL)
    return match.group(0) if match else None
def get_ai_decision(weather:dict):
    trend=weather.get("trend",{})
    prompt=f"""You are a smart weather-based travel assistant.
Analyze weather patterns for Morning, Afternoon, and Evening and return ONLY JSON.

Weather Data:
City: {weather['city']}
Temp: {weather['temperature']}°C
Condition: {weather['condition']}
Humidity: {weather['humidity']}%
Wind Speed: {weather['wind_speed']} km/h

Forecast Trend:
Morning: {trend.get('morning')}°C
Afternoon: {trend.get('afternoon')}°C
Evening: {trend.get('evening')}°C

Rules:
- If heavy rain → CAUTION + CAR
- If very hot (>38°C) → CAUTION or CAR
- If good weather -> YES + BIKE or WALK (Prefer WALK for short distances)
- Avoid bike/walk if high wind or storm

Respond ONLY valid JSON.
Format:
{{
"decision": "YES", "CAUTION", or "NO",
"vehicle": "BIKE", "CAR", "WALK", or "PUBLIC_TRANSPORT",
"plan": {{"morning":"...","afternoon":"...","evening":"..."}},
"reason": ["point1","point2","point3"]
}}"""
    response=requests.post("https://api.groq.com/openai/v1/chat/completions",headers={"Authorization":f"Bearer {GROQ_API_KEY}","Content-Type":"application/json"},json={"model":"llama-3.1-8b-instant","messages":[{"role":"user","content":prompt}],"temperature":0.2})
    data=response.json()
    content=data["choices"][0]["message"]["content"]
    try:
        json_str=extract_json(content)
        if json_str:
            return json.loads(json_str)
        raise ValueError("No JSON")
    except:
        return{"decision":"UNKNOWN","vehicle":"UNKNOWN","plan":{"morning":"","afternoon":"","evening":""},"reason":[content]}
