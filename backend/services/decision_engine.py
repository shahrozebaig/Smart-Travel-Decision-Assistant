def basic_rules(weather: dict):
    if weather["condition"].lower() == "rain":
        return "Prefer staying home or use a car."
    if weather["temperature"] > 38:
        return "Too hot, avoid going out."
    if weather["wind_speed"] > 40:
        return "Avoid bike due to high wind."
    return "Weather looks fine."