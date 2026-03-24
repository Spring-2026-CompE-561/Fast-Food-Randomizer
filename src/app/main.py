from fastapi import FastAPI

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI(title = "Fast Food Randomizer API", version="1.0.0") 

#this plug in the authentication routes into the main app

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fast Food Randomizer API!"}