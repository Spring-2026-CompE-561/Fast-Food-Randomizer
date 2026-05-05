from __future__ import annotations

import json
import sqlite3
from pathlib import Path

from app.core.database import SessionLocal
from app.models.restaurant import Restaurant

# Same path family as app.core.database.DB_PATH (repo root / fast_food_randomizer.db)
_SQLITE_DB = Path(__file__).resolve().parents[2] / "fast_food_randomizer.db"


def ensure_sqlite_restaurant_hours_columns() -> None:
    """Existing SQLite DBs lack hours_* until ALTERed; create_all() does not add columns."""
    if not _SQLITE_DB.is_file():
        return
    conn = sqlite3.connect(_SQLITE_DB)
    cur = conn.cursor()
    cur.execute("PRAGMA table_info(restaurants)")
    cols = {row[1] for row in cur.fetchall()}
    if "hours_display" not in cols:
        cur.execute("ALTER TABLE restaurants ADD COLUMN hours_display VARCHAR")
        print("SQLite: added column restaurants.hours_display")
    if "hours_schedule" not in cols:
        cur.execute("ALTER TABLE restaurants ADD COLUMN hours_schedule VARCHAR")
        print("SQLite: added column restaurants.hours_schedule")
    conn.commit()
    conn.close()


def week_schedule(open_hm: str, close_hm: str) -> str:
    keys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
    return json.dumps({k: [[open_hm, close_hm]] for k in keys})


def infer_hours(record: dict) -> tuple[str, str]:
    """Return (hours_schedule JSON, hours_display) for listings near SDSU."""
    name_l = record["name"].lower()
    cuisine_l = record["cuisine"].lower()

    if "starbucks" in name_l:
        return week_schedule("06:00", "21:00"), "Mon–Sun 6:00 AM–9:00 PM"
    if "shake smart" in name_l:
        return week_schedule("07:00", "21:00"), "Mon–Sun 7:00 AM–9:00 PM"
    if "aztec market" in name_l:
        return week_schedule("07:00", "23:00"), "Mon–Sun 7:00 AM–11:00 PM"
    if cuisine_l == "dining hall" or "utk" in name_l:
        return week_schedule("07:00", "21:00"), "Mon–Sun 7:00 AM–9:00 PM"
    if cuisine_l == "breakfast":
        return week_schedule("06:00", "22:00"), "Mon–Sun 6:00 AM–10:00 PM"
    if cuisine_l == "wings":
        return week_schedule("11:00", "23:00"), "Mon–Sun 11:00 AM–11:00 PM"
    if cuisine_l in ("pizza", "mexican", "fast food", "sandwich", "chinese", "convenience"):
        return week_schedule("10:30", "23:00"), "Mon–Sun 10:30 AM–11:00 PM"
    if cuisine_l in ("cafe", "smoothies", "healthy"):
        return week_schedule("07:00", "21:00"), "Mon–Sun 7:00 AM–9:00 PM"

    return week_schedule("11:00", "22:00"), "Mon–Sun 11:00 AM–10:00 PM"


def seed():
    ensure_sqlite_restaurant_hours_columns()

    db = SessionLocal()

    restaurants_raw = [
        {"name": "Broken Yolk Cafe (SDSU)", "cuisine": "Breakfast", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7757, "longitude": -117.0719},
        {"name": "Chipotle Mexican Grill (SDSU)", "cuisine": "Mexican", "price_range": 2, "dietary_tags": "vegan-options", "latitude": 32.7748, "longitude": -117.0710},
        {"name": "Habit Burger Grill (SDSU)", "cuisine": "American", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7745, "longitude": -117.0712},
        {"name": "Subway (SDSU)", "cuisine": "Sandwich", "price_range": 1, "dietary_tags": "vegetarian", "latitude": 32.7752, "longitude": -117.0715},
        {"name": "Panda Express (SDSU)", "cuisine": "Chinese", "price_range": 1, "dietary_tags": "limited-vegetarian", "latitude": 32.7739, "longitude": -117.0709},
        {"name": "Rubio’s Coastal Grill (SDSU)", "cuisine": "Mexican", "price_range": 2, "dietary_tags": "pescatarian", "latitude": 32.7746, "longitude": -117.0713},
        {"name": "Oggi’s Pizza Express (SDSU)", "cuisine": "Pizza", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7736, "longitude": -117.0708},
        {"name": "The Halal Shack (SDSU)", "cuisine": "Middle Eastern", "price_range": 2, "dietary_tags": "halal", "latitude": 32.7770, "longitude": -117.0695},
        {"name": "Starbucks (Aztec Student Union)", "cuisine": "Cafe", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7738, "longitude": -117.0707},
        {"name": "University Towers Kitchen (UTK)", "cuisine": "Dining Hall", "price_range": 2, "dietary_tags": "vegan-options", "latitude": 32.7725, "longitude": -117.0688},
        {"name": "Garden Restaurant (SDSU)", "cuisine": "American", "price_range": 3, "dietary_tags": "vegetarian-friendly", "latitude": 32.7750, "longitude": -117.0722},
        {"name": "Aztec Market (Student Union)", "cuisine": "Convenience", "price_range": 1, "dietary_tags": "varies", "latitude": 32.7735, "longitude": -117.0705},
        {"name": "Aztec Market (South Campus Plaza)", "cuisine": "Convenience", "price_range": 1, "dietary_tags": "varies", "latitude": 32.7718, "longitude": -117.0720},
        {"name": "Eureka!", "cuisine": "American", "price_range": 3, "dietary_tags": "vegetarian-friendly", "latitude": 32.7762, "longitude": -117.0735},
        {"name": "Which Wich (SDSU)", "cuisine": "Sandwich", "price_range": 1, "dietary_tags": "vegetarian-friendly", "latitude": 32.7761, "longitude": -117.0733},
        {"name": "Everbowl (SDSU)", "cuisine": "Healthy", "price_range": 1, "dietary_tags": "vegan", "latitude": 32.7759, "longitude": -117.0731},
        {"name": "Poki One N Half", "cuisine": "Hawaiian", "price_range": 2, "dietary_tags": "pescatarian", "latitude": 32.7759, "longitude": -117.0732},
        {"name": "Lolita’s Mexican Food", "cuisine": "Mexican", "price_range": 2, "dietary_tags": "vegetarian-options", "latitude": 32.7757, "longitude": -117.0730},
        {"name": "Epic Wings N’ Things", "cuisine": "Wings", "price_range": 2, "dietary_tags": "limited", "latitude": 32.7758, "longitude": -117.0730},
        {"name": "Wingstop (College Ave)", "cuisine": "Wings", "price_range": 2, "dietary_tags": "limited", "latitude": 32.7758, "longitude": -117.0734},
        {"name": "Domino’s Pizza (College Area)", "cuisine": "Pizza", "price_range": 1, "dietary_tags": "vegetarian-options", "latitude": 32.7753, "longitude": -117.0738},
        {"name": "Trujillo’s Taco Shop", "cuisine": "Mexican", "price_range": 1, "dietary_tags": "vegetarian-options", "latitude": 32.7751, "longitude": -117.0739},
        {"name": "Senor Pancho Fresh Mexican Grill", "cuisine": "Mexican", "price_range": 1, "dietary_tags": "vegetarian-options", "latitude": 32.7749, "longitude": -117.0740},
        {"name": "Pesto Italian Craft Kitchen", "cuisine": "Italian", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7756, "longitude": -117.0750},
        {"name": "Tajima Ramen (College Area)", "cuisine": "Japanese", "price_range": 2, "dietary_tags": "vegetarian-options", "latitude": 32.7750, "longitude": -117.0755},
        {"name": "Cafe Madeline", "cuisine": "Cafe", "price_range": 2, "dietary_tags": "vegetarian-friendly", "latitude": 32.7760, "longitude": -117.0760},
        {"name": "The Radical Beet", "cuisine": "Vegan", "price_range": 2, "dietary_tags": "vegan", "latitude": 32.7755, "longitude": -117.0765},
        {"name": "Burger King (College Area)", "cuisine": "Fast Food", "price_range": 1, "dietary_tags": "limited-vegetarian", "latitude": 32.7755, "longitude": -117.0725},
        {"name": "Taco Bell (College Area)", "cuisine": "Mexican", "price_range": 1, "dietary_tags": "vegetarian-options", "latitude": 32.7742, "longitude": -117.0709},
        {"name": "Shake Smart (SDSU)", "cuisine": "Smoothies", "price_range": 1, "dietary_tags": "healthy", "latitude": 32.7739, "longitude": -117.0706},
    ]

    restaurants = []
    for raw in restaurants_raw:
        sched, disp = infer_hours(raw)
        restaurants.append({**raw, "hours_schedule": sched, "hours_display": disp})

    for r in restaurants:
        exists = db.query(Restaurant).filter(Restaurant.name == r["name"]).first()
        if not exists:
            db.add(Restaurant(**r))
        else:
            exists.hours_display = r["hours_display"]
            exists.hours_schedule = r["hours_schedule"]

    db.commit()
    db.close()
    print("Seeding complete!")


if __name__ == "__main__":
    seed()
