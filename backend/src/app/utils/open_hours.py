"""Determine whether a restaurant is open now (America/Los_Angeles)."""

from __future__ import annotations

import json
from datetime import datetime, time
from typing import Any, Optional
from zoneinfo import ZoneInfo

_DISPLAY_TZ = ZoneInfo("America/Los_Angeles")


def _parse_hhmm(s: str) -> time:
    parts = str(s).strip().split(":")
    h = int(parts[0])
    m = int(parts[1]) if len(parts) > 1 else 0
    return time(h, m)


def restaurant_is_open_now(weekly_hours_json: Optional[str]) -> bool:
    """Return True if current local time falls inside any interval for today."""

    if weekly_hours_json is None or not str(weekly_hours_json).strip():
        return False
    try:
        weekly: dict[str, Any] = json.loads(weekly_hours_json)
    except (json.JSONDecodeError, TypeError):
        return False

    now = datetime.now(_DISPLAY_TZ)
    wd = str(now.weekday())  # Monday=0 … Sunday=6
    intervals = weekly.get(wd)
    if not intervals or not isinstance(intervals, list):
        return False

    t = now.time()
    for pair in intervals:
        if not isinstance(pair, (list, tuple)) or len(pair) != 2:
            continue
        open_t = _parse_hhmm(str(pair[0]))
        close_t = _parse_hhmm(str(pair[1]))
        if open_t <= close_t:
            if open_t <= t <= close_t:
                return True
        else:
            # Overnight window (e.g. 22:00–02:00)
            if t >= open_t or t <= close_t:
                return True
    return False
