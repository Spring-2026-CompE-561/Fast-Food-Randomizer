"""Parse weekly hours JSON and compute whether a venue is open (America/Los_Angeles)."""

from __future__ import annotations

import json
from datetime import datetime
from typing import Any, Optional
from zoneinfo import ZoneInfo

_LA = ZoneInfo("America/Los_Angeles")
_WEEK_KEYS = ("mon", "tue", "wed", "thu", "fri", "sat", "sun")


def _minutes(hh_mm: str) -> int:
    parts = hh_mm.strip().split(":")
    h = int(parts[0])
    m = int(parts[1]) if len(parts) > 1 else 0
    return h * 60 + m


def is_restaurant_open_now(
    hours_schedule: Optional[str],
    *,
    now: Optional[datetime] = None,
) -> bool:
    """
    hours_schedule: JSON object with keys mon..sun, each value a list of [open, close]
    pairs as \"HH:MM\" strings (24h). Empty list or missing day => closed that day.
    Unknown / invalid schedule => not considered open (strict for filtering).
    """
    if not hours_schedule or not str(hours_schedule).strip():
        return False
    try:
        data: dict[str, Any] = json.loads(hours_schedule)
    except json.JSONDecodeError:
        return False

    now = now or datetime.now(_LA)
    if now.tzinfo is None:
        now = now.replace(tzinfo=_LA)
    else:
        now = now.astimezone(_LA)

    wd = now.weekday()
    key = _WEEK_KEYS[wd]
    windows = data.get(key)
    if windows is None:
        windows = data.get(key.upper())
    if not windows:
        return False

    cur = now.hour * 60 + now.minute
    for win in windows:
        if not isinstance(win, (list, tuple)) or len(win) != 2:
            continue
        start = _minutes(str(win[0]))
        end = _minutes(str(win[1]))
        if start <= cur <= end:
            return True
    return False
