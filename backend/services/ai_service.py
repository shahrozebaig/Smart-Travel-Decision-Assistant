import requests,json,re
from utils.config import GROQ_API_KEY
def extract_json(text:str):
    match=re.search(r"\{.*\}",text,re.DOTALL)
    return match.group(0) if match else None
def get_ai_decision(weather:dict):
    trend=weather.get("trend",{})
    prompt=f"""You are a smart weather-based travel assistant.
Analyze weather for Morning, Afternoon, Evening and return ONLY JSON.
Weather Data:
City:{weather['city']}
Temperature:{weather['temperature']}°C
Condition:{weather['condition']}
Humidity:{weather['humidity']}%
Wind Speed:{weather['wind_speed']} km/h
Trend:
Morning:{trend.get('morning')}
Afternoon:{trend.get('afternoon')}
Evening:{trend.get('evening')}
Rules:
- If heavy rain → NO + CAR
- If very hot (>38°C) → NO or CAR
- If good weather → YES + BIKE/WALK
- Avoid bike if high wind
IMPORTANT:
Respond ONLY valid JSON.
Format:
{{
"decision":"YES or NO",
"vehicle":"BIKE|CAR|WALK|PUBLIC_TRANSPORT",
"plan":{{"morning":"...","afternoon":"...","evening":"..."}},
"reason":["point1","point2","point3"]
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
