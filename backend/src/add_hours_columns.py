"""Add hours_display / hours_schedule to SQLite restaurants table if missing.

Run from repo root:
  cd backend && PYTHONPATH=src python3 -m add_hours_columns
"""

from __future__ import annotations

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[2] / "fast_food_randomizer.db"


def main() -> None:
    if not DB_PATH.is_file():
        print(f"No database at {DB_PATH}; skip migration.")
        return
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("PRAGMA table_info(restaurants)")
    cols = {row[1] for row in cur.fetchall()}
    if "hours_display" not in cols:
        cur.execute("ALTER TABLE restaurants ADD COLUMN hours_display VARCHAR")
        print("Added column hours_display")
    if "hours_schedule" not in cols:
        cur.execute("ALTER TABLE restaurants ADD COLUMN hours_schedule VARCHAR")
        print("Added column hours_schedule")
    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
