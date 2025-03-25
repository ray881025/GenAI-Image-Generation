from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.responses import JSONResponse
import uuid
import os
from typing import Optional, List
import json
from datetime import datetime

from models.schemas import GenerationRequest, GenerationResponse, HealthResponse
from services.image_generator import StableDiffusionGenerator

router = APIRouter(prefix="/api/v1", tags=["image-generation"])

# Initialize the image generator
generator = StableDiffusionGenerator()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Check the health status of the API and model
    """
    return HealthResponse(
        status="healthy",
        model_loaded=True,
        device=generator.device
    )

@router.post("/generate", response_model=GenerationResponse)
async def generate_image(request: GenerationRequest):
    """
    Generate an image based on the provided prompt and parameters
    """
    try:
        # Generate a unique filename
        image_filename = f"{uuid.uuid4()}.png"
        image_path = f"static/images/{image_filename}"
        
        # Generate the image
        generation_params = {
        "prompt": request.prompt,
        "negative_prompt": request.negative_prompt,
        "num_inference_steps": 10,  # force low
        "guidance_scale": request.guidance_scale,
        "width": 256,               # force low
        "height": 256,
        "seed": request.seed
        }
        print(f"[API] Starting image generation...")

        # Call the image generator service
        generator.generate_image(image_path, **generation_params)
        # Save metadata (prompt + timestamp) as JSON
        metadata = {
            "prompt": request.prompt,
            "created_at": datetime.utcnow().isoformat()
        }
        with open(f"{image_path}.json", "w") as meta_file:
            json.dump(metadata, meta_file)

        print(f"[API] Generation complete! Image saved at: {image_path}")

        # Return the response
        return GenerationResponse(
            image_url=f"/static/images/{image_filename}",
            prompt=request.prompt,
            generation_params=generation_params
        )
    except Exception as e:
        print(f"[API] Error during generation: {e}")
        raise HTTPException(status_code=500, detail=str(e))