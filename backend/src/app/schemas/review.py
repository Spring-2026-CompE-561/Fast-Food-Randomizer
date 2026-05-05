from pydantic import BaseModel, Field


ALLOWED_REVIEW_TAG_SLUGS = frozenset(
    {
        "fast",
        "late_night",
        "good_portions",
        "hit_or_miss",
        "good_for_groups",
        "study_friendly",
        "loud",
        "always_busy",
        "date_spot",
    }
)


class MyRestaurantTagsResponse(BaseModel):
    tags: list[str]


class ReplaceRestaurantTagsBody(BaseModel):
    tags: list[str] = Field(default_factory=list)
