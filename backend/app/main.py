from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import os
import uuid
import shutil
from typing import Optional, List
import uvicorn
from pydantic import BaseModel

# Import services for image generation
from services.image_generator import StableDiffusionGenerator

# Import routers
from routers import generation, gallery

app = FastAPI(title="GenAI Image Generation API", 
              description="API for generating images using Stable Diffusion",
              version="1.0.0")

# Define API prefix
API_PREFIX = "/api/v1"

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories for storing generated images
os.makedirs("static/images", exist_ok=True)

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Models
class GenerationRequest(BaseModel):
    prompt: str
    negative_prompt: Optional[str] = None
    num_inference_steps: Optional[int] = 50
    guidance_scale: Optional[float] = 7.5
    width: Optional[int] = 512
    height: Optional[int] = 512
    seed: Optional[int] = None

class GenerationResponse(BaseModel):
    image_url: str
    prompt: str
    generation_params: dict

@app.get("/")
async def read_root():
    return {"message": "Welcome to the GenAI Image Generation API"}

# Include routers
app.include_router(generation.router)
app.include_router(gallery.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)