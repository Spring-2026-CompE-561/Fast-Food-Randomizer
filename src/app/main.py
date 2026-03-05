from fastapi import FastAPI

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI() 

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}