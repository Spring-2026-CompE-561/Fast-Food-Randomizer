from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.review import Review


class ReviewRepository:
    @staticmethod
    def tag_counts_for_restaurant(db: Session, restaurant_id: int) -> dict[str, int]:
        rows = (
            db.query(Review.tag, func.count(Review.id))
            .filter(Review.restaurant_id == restaurant_id)
            .group_by(Review.tag)
            .all()
        )
        return {str(tag): int(n) for tag, n in rows}

    @staticmethod
    def tag_counts_by_restaurant(db: Session) -> dict[int, dict[str, int]]:
        rows = (
            db.query(Review.restaurant_id, Review.tag, func.count(Review.id))
            .group_by(Review.restaurant_id, Review.tag)
            .all()
        )
        out: dict[int, dict[str, int]] = {}
        for restaurant_id, tag, n in rows:
            out.setdefault(int(restaurant_id), {})[str(tag)] = int(n)
        return out

    @staticmethod
    def tags_for_user_restaurant(
        db: Session, *, user_id: int, restaurant_id: int
    ) -> list[str]:
        rows = (
            db.query(Review.tag)
            .filter(
                Review.user_id == user_id,
                Review.restaurant_id == restaurant_id,
            )
            .order_by(Review.tag.asc())
            .all()
        )
        return [str(r[0]) for r in rows]

    @staticmethod
    def replace_user_restaurant_tags(
        db: Session,
        *,
        user_id: int,
        restaurant_id: int,
        tags: list[str],
    ) -> None:
        db.query(Review).filter(
            Review.user_id == user_id,
            Review.restaurant_id == restaurant_id,
        ).delete(synchronize_session=False)
        for tag in tags:
            db.add(
                Review(
                    user_id=user_id,
                    restaurant_id=restaurant_id,
                    tag=tag,
                )
            )
        db.commit()
