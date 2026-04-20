from pydantic import BaseModel
from typing import Optional
class WeatherResponse(BaseModel):
    city: str
    temperature: float
    humidity: int
    wind_speed: float
    condition: str
class AIDecision(BaseModel):
    decision: str
    vehicle: str
    reason: str
class AnalysisData(BaseModel):
    city: str
    weather: WeatherResponse
    ai_decision: AIDecision
    rule_based_hint: Optional[str]
class APIResponse(BaseModel):
    status: str
    message: str
    data: AnalysisData