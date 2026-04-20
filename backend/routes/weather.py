from fastapi import APIRouter, Query, HTTPException, status
from services.weather_service import get_weather
from services.ai_service import get_ai_decision
from services.decision_engine import basic_rules
router = APIRouter(tags=["Weather Analysis"])
@router.get("/analyze", status_code=status.HTTP_200_OK)
def analyze_weather(city: str = Query(..., description="City name")):
    try:
        weather = get_weather(city)
        ai_response = get_ai_decision(weather)
        rule_hint = basic_rules(weather)
        return {
            "status": "success",
            "message": "Weather analysis completed",
            "data": {
                "city": weather["city"],
                "weather": {
                    "temperature": weather["temperature"],
                    "humidity": weather["humidity"],
                    "wind_speed": weather["wind_speed"],
                    "condition": weather["condition"]
                },
                "ai_decision": ai_response,
                "rule_based_hint": rule_hint
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze weather: {str(e)}"
        )