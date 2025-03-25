# 🚀 GenAI Image Generation App

An end-to-end AI image generation application powered by **Stable Diffusion**. Enter a text prompt, customize parameters, and watch your words turn into visuals—right in your browser.

---

## 🧠 Overview

This project showcases how to build a full-stack text-to-image generation app using **generative AI**. It leverages **Stable Diffusion** for high-quality image creation and offers an intuitive web interface for exploration and experimentation.

---

## ✨ Features

- 🖼️ Generate AI images from text prompts using Stable Diffusion
- 🛠️ Customize parameters like resolution, guidance scale, and steps
- 🧠 Prompt suggestions for creativity boosts
- 📜 Gallery of past generations
- 🗑️ View, zoom, and delete images
- ⚡ Built with modern frameworks (FastAPI + React)

---

## 🧰 Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| **Frontend**   | React.js, MUI                                    |
| **Backend**    | Python, FastAPI                                  |
| **AI Model**   | Stable Diffusion (via Hugging Face 🤗 Diffusers) |
| **Deployment** | Docker + Docker Compose                          |

---

## 🛠️ How It Works

- Frontend collects user input and sends it to the FastAPI backend
- Backend loads the Stable Diffusion model and generates an image
- The generated image is saved and returned to the frontend for preview
- Gallery page lists all generated images with preview and delete options

---

## 📏 Evaluation Criteria

- ✅ Image quality and faithfulness to prompt
- ✅ Speed and stability of inference
- ✅ Responsiveness and UX of the frontend
- ✅ Error handling and backend robustness

---

## 🚧 Future Enhancements

- 🎨 Fine-tuning for user-defined styles
- 🔐 User authentication and image history
- 🔄 Generate variations / upscaling
- 🤝 Integration with other diffusion models (e.g., SDXL, Anything v4)
- ✍️ Editable prompt templates or style presets
