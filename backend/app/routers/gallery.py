from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import os
from typing import List
import json
from datetime import datetime

router = APIRouter(prefix="/api/v1", tags=["gallery"])

@router.get("/images")
async def list_images():
    """
    Return a list of all generated images with metadata
    """
    image_dir = "static/images"
    image_data = []

    try:
        for file in os.listdir(image_dir):
            if file.endswith((".png", ".jpg", ".jpeg")):
                image_path = os.path.join(image_dir, file)
                json_path = f"{image_path}.json"

                prompt = file
                created_at = None

                # Try to read metadata from corresponding JSON file
                if os.path.exists(json_path):
                    try:
                        with open(json_path, "r") as f:
                            metadata = json.load(f)
                            prompt = metadata.get("prompt", prompt)
                            created_at = metadata.get("created_at")
                    except Exception as e:
                        print(f"⚠️ Error reading metadata for {file}: {e}")

                image_data.append({
                    "filename": file,
                    "url": f"/static/images/{file}",
                    "prompt": prompt,
                    "created_at": created_at or datetime.utcnow().isoformat()
                })

        # Sort images by most recent
        image_data.sort(key=lambda x: x["created_at"], reverse=True)
        return image_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/images/{filename}")
async def delete_image(filename: str):
    image_path = f"static/images/{filename}"
    if os.path.exists(image_path):
        os.remove(image_path)
        return {"message": f"{filename} deleted successfully"}
    raise HTTPException(status_code=404, detail="Image not found")