# Fast Food Randomizer (Backend)

This project is a Python **FastAPI** backend for a Fast Food Randomizer application.

## Setup

Create and activate a virtual environment, then install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run the API

```bash
uvicorn src.app.main:app --reload
```

Then open:
- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/docs`

## Randomizer Feature

### Endpoint

`POST /api/v1/randomizer`

### Request Body

- `latitude` (required): user latitude
- `longitude` (required): user longitude
- `cuisine` (optional)
- `price_range` (optional, 1–5)
- `dietary_tag` (optional)
- `user_id` (optional; used when recording history)

### Behavior

- Applies the provided filters.
- Only considers restaurants **within 3 miles** of the provided user location.
- Selects **one random restaurant** from eligible matches.
- Records the selection in the `history` table.

### Example Request (Postman / curl)

```bash
curl -X POST "http://127.0.0.1:8000/api/v1/randomizer" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 42.3601,
    "longitude": -71.0589,
    "cuisine": "Burgers",
    "price_range": 2,
    "dietary_tag": "vegetarian",
    "user_id": "demo-user"
  }'
```

## Notes

- The `Restaurant` model includes `latitude` and `longitude`. Restaurants without coordinates are not eligible for randomization.
- Database tables are created on application startup using SQLAlchemy metadata.

