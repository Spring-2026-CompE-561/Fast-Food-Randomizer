import json

from app.core.database import SessionLocal
from app.models.restaurant import Restaurant


def _pack(display: str, weekly: dict) -> dict:
    return {"hours_display": display, "weekly_hours_json": json.dumps(weekly)}


def _every_day(open_h: str, close_h: str) -> dict:
    return {str(i): [[open_h, close_h]] for i in range(7)}


_DEFAULT_WEEKLY = {str(i): [["10:30", "21:00"]] for i in range(5)}
_DEFAULT_WEEKLY["5"] = [["11:00", "21:00"]]
_DEFAULT_WEEKLY["6"] = [["11:00", "20:00"]]

DEFAULT_HOURS = _pack(
    "Mon–Fri 10:30am–9pm · Sat 11am–9pm · Sun 11am–8pm",
    _DEFAULT_WEEKLY,
)

_SB_WEEKLY = {str(i): [["06:30", "21:00"]] for i in range(5)}
_SB_WEEKLY["5"] = [["07:00", "20:00"]]
_SB_WEEKLY["6"] = [["08:00", "20:00"]]

_SHAKE_WEEKLY = {str(i): [["08:00", "20:00"]] for i in range(5)}
_SHAKE_WEEKLY["5"] = [["09:00", "18:00"]]
_SHAKE_WEEKLY["6"] = [["09:00", "18:00"]]

_EUREKA_WEEKLY = {str(i): [["11:00", "22:00"]] for i in range(4)}
_EUREKA_WEEKLY["4"] = [["11:00", "23:00"]]  # Fri
_EUREKA_WEEKLY["5"] = [["11:00", "23:00"]]  # Sat
_EUREKA_WEEKLY["6"] = [["11:00", "21:00"]]  # Sun

_RADICAL_WEEKLY = {str(i): [["11:00", "20:00"]] for i in range(6)}
_RADICAL_WEEKLY["6"] = [["11:00", "18:00"]]

_HOURS_OVERRIDES = {
    "Starbucks (Aztec Student Union)": _pack(
        "Mon–Fri 6:30am–9pm · Sat 7am–8pm · Sun 8am–8pm",
        _SB_WEEKLY,
    ),
    "University Towers Kitchen (UTK)": _pack("Daily 7am–9pm", _every_day("07:00", "21:00")),
    "Garden Restaurant (SDSU)": _pack("Daily 11am–9pm", _every_day("11:00", "21:00")),
    "Aztec Market (Student Union)": _pack("Daily 7am–11pm", _every_day("07:00", "23:00")),
    "Aztec Market (South Campus Plaza)": _pack(
        "Daily 7am–11pm", _every_day("07:00", "23:00")
    ),
    "Broken Yolk Cafe (SDSU)": _pack("Daily 7am–3pm", _every_day("07:00", "15:00")),
    "Taco Bell (College Area)": _pack("Daily 7am–2am", _every_day("07:00", "02:00")),
    "Burger King (College Area)": _pack("Daily 6am–11pm", _every_day("06:00", "23:00")),
    "Domino’s Pizza (College Area)": _pack(
        "Daily 10am–1am", _every_day("10:00", "01:00")
    ),
    "Shake Smart (SDSU)": _pack(
        "Mon–Fri 8am–8pm · Sat–Sun 9am–6pm",
        _SHAKE_WEEKLY,
    ),
    "Eureka!": _pack(
        "Mon–Fri 11am–10pm · Sat 11am–11pm · Sun 11am–9pm",
        _EUREKA_WEEKLY,
    ),
    "The Radical Beet": _pack(
        "Mon–Sat 11am–8pm · Sun 11am–6pm",
        _RADICAL_WEEKLY,
    ),
}

_RAW_RESTAURANTS = [
    {
        "name": "Broken Yolk Cafe (SDSU)",
        "cuisine": "Breakfast",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7757,
        "longitude": -117.0719,
    },
    {
        "name": "Chipotle Mexican Grill (SDSU)",
        "cuisine": "Mexican",
        "price_range": 2,
        "dietary_tags": "vegan-options",
        "latitude": 32.7748,
        "longitude": -117.0710,
    },
    {
        "name": "Habit Burger Grill (SDSU)",
        "cuisine": "American",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7745,
        "longitude": -117.0712,
    },
    {
        "name": "Subway (SDSU)",
        "cuisine": "Sandwich",
        "price_range": 1,
        "dietary_tags": "vegetarian",
        "latitude": 32.7752,
        "longitude": -117.0715,
    },
    {
        "name": "Panda Express (SDSU)",
        "cuisine": "Chinese",
        "price_range": 1,
        "dietary_tags": "limited-vegetarian",
        "latitude": 32.7739,
        "longitude": -117.0709,
    },
    {
        "name": "Rubio’s Coastal Grill (SDSU)",
        "cuisine": "Mexican",
        "price_range": 2,
        "dietary_tags": "pescatarian",
        "latitude": 32.7746,
        "longitude": -117.0713,
    },
    {
        "name": "Oggi’s Pizza Express (SDSU)",
        "cuisine": "Pizza",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7736,
        "longitude": -117.0708,
    },
    {
        "name": "The Halal Shack (SDSU)",
        "cuisine": "Middle Eastern",
        "price_range": 2,
        "dietary_tags": "halal",
        "latitude": 32.7770,
        "longitude": -117.0695,
    },
    {
        "name": "Starbucks (Aztec Student Union)",
        "cuisine": "Cafe",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7738,
        "longitude": -117.0707,
    },
    {
        "name": "University Towers Kitchen (UTK)",
        "cuisine": "Dining Hall",
        "price_range": 2,
        "dietary_tags": "vegan-options",
        "latitude": 32.7725,
        "longitude": -117.0688,
    },
    {
        "name": "Garden Restaurant (SDSU)",
        "cuisine": "American",
        "price_range": 3,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7750,
        "longitude": -117.0722,
    },
    {
        "name": "Aztec Market (Student Union)",
        "cuisine": "Convenience",
        "price_range": 1,
        "dietary_tags": "varies",
        "latitude": 32.7735,
        "longitude": -117.0705,
    },
    {
        "name": "Aztec Market (South Campus Plaza)",
        "cuisine": "Convenience",
        "price_range": 1,
        "dietary_tags": "varies",
        "latitude": 32.7718,
        "longitude": -117.0720,
    },
    {
        "name": "Eureka!",
        "cuisine": "American",
        "price_range": 3,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7762,
        "longitude": -117.0735,
    },
    {
        "name": "Which Wich (SDSU)",
        "cuisine": "Sandwich",
        "price_range": 1,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7761,
        "longitude": -117.0733,
    },
    {
        "name": "Everbowl (SDSU)",
        "cuisine": "Healthy",
        "price_range": 1,
        "dietary_tags": "vegan",
        "latitude": 32.7759,
        "longitude": -117.0731,
    },
    {
        "name": "Poki One N Half",
        "cuisine": "Hawaiian",
        "price_range": 2,
        "dietary_tags": "pescatarian",
        "latitude": 32.7759,
        "longitude": -117.0732,
    },
    {
        "name": "Lolita’s Mexican Food",
        "cuisine": "Mexican",
        "price_range": 2,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7757,
        "longitude": -117.0730,
    },
    {
        "name": "Epic Wings N’ Things",
        "cuisine": "Wings",
        "price_range": 2,
        "dietary_tags": "limited",
        "latitude": 32.7758,
        "longitude": -117.0730,
    },
    {
        "name": "Wingstop (College Ave)",
        "cuisine": "Wings",
        "price_range": 2,
        "dietary_tags": "limited",
        "latitude": 32.7758,
        "longitude": -117.0734,
    },
    {
        "name": "Domino’s Pizza (College Area)",
        "cuisine": "Pizza",
        "price_range": 1,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7753,
        "longitude": -117.0738,
    },
    {
        "name": "Trujillo’s Taco Shop",
        "cuisine": "Mexican",
        "price_range": 1,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7751,
        "longitude": -117.0739,
    },
    {
        "name": "Senor Pancho Fresh Mexican Grill",
        "cuisine": "Mexican",
        "price_range": 1,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7749,
        "longitude": -117.0740,
    },
    {
        "name": "Pesto Italian Craft Kitchen",
        "cuisine": "Italian",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7756,
        "longitude": -117.0750,
    },
    {
        "name": "Tajima Ramen (College Area)",
        "cuisine": "Japanese",
        "price_range": 2,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7750,
        "longitude": -117.0755,
    },
    {
        "name": "Cafe Madeline",
        "cuisine": "Cafe",
        "price_range": 2,
        "dietary_tags": "vegetarian-friendly",
        "latitude": 32.7760,
        "longitude": -117.0760,
    },
    {
        "name": "The Radical Beet",
        "cuisine": "Vegan",
        "price_range": 2,
        "dietary_tags": "vegan",
        "latitude": 32.7755,
        "longitude": -117.0765,
    },
    {
        "name": "Burger King (College Area)",
        "cuisine": "Fast Food",
        "price_range": 1,
        "dietary_tags": "limited-vegetarian",
        "latitude": 32.7755,
        "longitude": -117.0725,
    },
    {
        "name": "Taco Bell (College Area)",
        "cuisine": "Mexican",
        "price_range": 1,
        "dietary_tags": "vegetarian-options",
        "latitude": 32.7742,
        "longitude": -117.0709,
    },
    {
        "name": "Shake Smart (SDSU)",
        "cuisine": "Smoothies",
        "price_range": 1,
        "dietary_tags": "healthy",
        "latitude": 32.7739,
        "longitude": -117.0706,
    },
]


def seed():
    db = SessionLocal()

    rows = []
    for raw in _RAW_RESTAURANTS:
        merged = {**raw, **_HOURS_OVERRIDES.get(raw["name"], DEFAULT_HOURS)}
        rows.append(merged)

    try:
        for r in rows:
            exists = db.query(Restaurant).filter(Restaurant.name == r["name"]).first()
            hd = r.get("hours_display")
            wj = r.get("weekly_hours_json")
            if exists is None:
                db.add(
                    Restaurant(
                        name=r["name"],
                        cuisine=r["cuisine"],
                        price_range=r["price_range"],
                        dietary_tags=r["dietary_tags"],
                        latitude=r["latitude"],
                        longitude=r["longitude"],
                        hours_display=hd,
                        weekly_hours_json=wj,
                    )
                )
            elif (not (exists.hours_display or "").strip()) and hd:
                exists.hours_display = hd
                exists.weekly_hours_json = wj

        db.commit()
    finally:
        db.close()

    print("Seeding complete!")


if __name__ == "__main__":
    seed()
