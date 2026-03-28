from fastapi.testclient import TestClient
import pytest
import random
from app.main import app

client = TestClient(app)

def test_register_new_user():
    """Tests if the API can successfully register a new user"""
    # Generate a random email so we don't get 'email already exists' errors
    test_id = random.randint(1, 10000)
    payload = {
        "username": f"tester{test_id}",
        "email": f"test{test_id}@sdsu.edu",
        "password": "securePassword123"
    }
    
    response = client.post("/api/v1/auth/register", json=payload)
    
    assert response.status_code == 201
    assert response.json()["email"] == payload["email"]

def test_login_user():
    """Tests if the API can log in an existing user"""
    # Note: Use a user you know exists or create one in the test
    payload = {
        "username": "tester", # Must match your UserCreate schema
        "email": "test@sdsu.edu",
        "password": "securePassword123"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    
    assert response.status_code == 200
    assert "access_token" in response.json()