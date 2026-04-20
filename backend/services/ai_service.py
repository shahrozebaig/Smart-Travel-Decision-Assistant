import requests
import json
import re
from utils.config import GROQ_API_KEY
def extract_json(text: str):
    match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    if match:
        return match.group(1)
    match = re.search(r"(\{.*\})", text, re.DOTALL)
    if match:
        return match.group(1)
    return None
def get_ai_decision(weather: dict):
    prompt = f"""
You are a smart weather-based travel assistant.
Analyze the given weather data and return ONLY a valid JSON response.
Weather Data:
City: {weather['city']}
Temperature: {weather['temperature']}°C
Condition: {weather['condition']}
Humidity: {weather['humidity']}%
Wind Speed: {weather['wind_speed']} km/h
Rules:
- If heavy rain → NO + CAR
- If very hot (>38°C) → NO or CAR
- If good weather → YES + BIKE/WALK
- Avoid bike if high wind
IMPORTANT:
Respond ONLY with valid JSON.
Do NOT include markdown, code blocks, or explanation.
Format:
{{
  "decision": "YES or NO",
  "vehicle": "BIKE | CAR | WALK | PUBLIC_TRANSPORT",
  "reason": "Explain clearly WHY going out is not recommended and WHY this vehicle is best"
}}
"""
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.1-8b-instant",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.1
        }
    )
    data = response.json()
    content = data["choices"][0]["message"]["content"]
    try:
        json_str = extract_json(content)

        if json_str:
            parsed = json.loads(json_str)
            return parsed

        raise ValueError("No JSON found")
    except Exception:
        return {
            "decision": "UNKNOWN",
            "vehicle": "UNKNOWN",
            "reason": content
        }