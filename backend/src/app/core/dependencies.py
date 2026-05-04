from typing import Annotated, Optional

from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import oauth2_scheme, verify_token
from app.core.database import get_db
from app.exceptions.credential_exception import credentials_exception
from app.models.user import User
from app.services import user as user_service
from app.core.auth import verify_token, optional_oauth2_scheme, oauth2_scheme


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:

    payload = verify_token(token)
    if payload is None:
        raise credentials_exception

    email: Optional[str] = payload.get("sub")
    if email is None:
        raise credentials_exception

    user = user_service.get_by_mail(db, email=email)
    if user is None:
        raise credentials_exception

    return user

def get_optional_user(
    token: Annotated[Optional[str], Depends(optional_oauth2_scheme)] = None,
    db: Annotated[Session, Depends(get_db)] = None,
) -> Optional[User]:
    if token is None:
        return None

    payload = verify_token(token)
    if payload is None:
        return None

    email: Optional[str] = payload.get("sub")
    if email is None:
        return None

    return user_service.get_by_mail(db, email=email)