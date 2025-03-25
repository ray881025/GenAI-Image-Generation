from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class GenerationRequest(BaseModel):
    """
    Schema for image generation request
    """
    prompt: str = Field(..., description="Text prompt for image generation")
    negative_prompt: Optional[str] = Field(None, description="Text prompt for what to avoid in the image")
    num_inference_steps: Optional[int] = Field(50, description="Number of denoising steps")
    guidance_scale: Optional[float] = Field(7.5, description="How closely to follow the prompt")
    width: Optional[int] = Field(512, description="Width of the generated image")
    height: Optional[int] = Field(512, description="Height of the generated image")
    seed: Optional[int] = Field(None, description="Random seed for reproducibility")

class GenerationResponse(BaseModel):
    """
    Schema for image generation response
    """
    image_url: str = Field(..., description="URL to the generated image")
    prompt: str = Field(..., description="Text prompt used for generation")
    generation_params: Dict[str, Any] = Field(..., description="Parameters used for generation")

class HealthResponse(BaseModel):
    """
    Schema for health check response
    """
    status: str = Field(..., description="Health status of the API")
    model_loaded: bool = Field(..., description="Whether the model is loaded")
    device: str = Field(..., description="Device being used for inference")