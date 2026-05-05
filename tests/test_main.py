from fastapi.testclient import TestClient
import pytest
# Ensure your FastAPI file is named main.py and is in the root or same folder
from main import app 

# We use the TestClient to simulate requests to our FastAPI server
client = TestClient(app)

# UNIT TESTS (To hit 50% Coverage)
def test_read_root():
    """
    Unit Test: Checks the home route.
    Proves the server is running and returning the basic welcome message.
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the SDSU Randomizer API"}

def test_randomize_model_validation():
    """
    Unit Test: Verifies that the Pydantic data model is working.
    If we send bad data, the backend should return a 422 Unprocessable Entity error.
    """
    # Sending 'price_range' as a string instead of an integer to test validation
    response = client.post("/randomize", json={
        "price_range": "very expensive", 
        "cuisine": "Mexican"
    })
    assert response.status_code == 422

#Integration Test
def test_integration_frontend_to_backend():
    
    # 1. simulate the payload the Next.js frontend would send
    payload = {
        "price_range": 2, 
        "cuisine": "Burger"
    }
    
    # 2. trigger the backend endpoint
    response = client.post("/randomize", json=payload)
    
    # 3. verify the 'connection' and 'data integrity'
    assert response.status_code == 200
    
    data = response.json()
    
    # ensure the backend returned a restaurant object as expected
    assert "name" in data
    assert data["cuisine"] == "Burger"
    assert data["price_range"] == 2