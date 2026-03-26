import math
import random
from typing import List, Optional, Tuple

from app.models.restaurant import Restaurant


def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r_miles = 3958.7613
    lat1_r = math.radians(lat1)
    lon1_r = math.radians(lon1)
    lat2_r = math.radians(lat2)
    lon2_r = math.radians(lon2)
    dlat = lat2_r - lat1_r
    dlon = lon2_r - lon1_r
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_r) * math.cos(lat2_r) * (math.sin(dlon / 2) ** 2)
    )
    c = 2 * math.asin(math.sqrt(a))
    return r_miles * c


def choose_random_within_radius(
    *,
    restaurants: List[Restaurant],
    user_latitude: float,
    user_longitude: float,
    radius_miles: float,
) -> Optional[Tuple[Restaurant, float]]:
    within_radius: List[Tuple[Restaurant, float]] = []
    for r in restaurants:
        if r.latitude is None or r.longitude is None:
            continue
        dist = haversine_miles(
            user_latitude,
            user_longitude,
            float(r.latitude),
            float(r.longitude),
        )
        if dist <= radius_miles:
            within_radius.append((r, dist))

    if not within_radius:
        return None

    return random.choice(within_radius)

