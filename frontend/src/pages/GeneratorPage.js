import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
  Alert,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Send as SendIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import axios from 'axios';

const GeneratorPage = () => {
  // State for form inputs
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [numInferenceSteps, setNumInferenceSteps] = useState(10);
  const [guidanceScale, setGuidanceScale] = useState(5);
  const [width, setWidth] = useState(256);
  const [height, setHeight] = useState(256);
  const [seed, setSeed] = useState('');
  
  // State for generation process
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [generationParams, setGenerationParams] = useState(null);

  // Example prompts for inspiration
  const examplePrompts = [
    "A serene landscape with mountains and a lake at sunset",
    "A futuristic cityscape with flying cars and neon lights",
    "A photorealistic portrait of a fantasy character with detailed features",
    "An abstract painting with vibrant colors and geometric shapes",
    "A cozy cafe interior with warm lighting and people reading books"
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsGenerating(true);
    
    try {
      // Prepare the request payload
      const payload = {
        prompt,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
        width,
        height,
        seed: seed ? parseInt(seed) : undefined
      };
      
      // Make API request to the backend
      const response = await axios.post('/api/v1/generate', payload, {
        timeout: 300000  // 5 minutes (in ms)
      });
      console.log("✅ API Response:", response.data);
      
      // Update state with the generated image
      // Ensure the image URL is properly prefixed with the backend URL
      const imageUrl = response.data.image_url.startsWith('http') 
        ? response.data.image_url 
        : `${window.location.origin}${response.data.image_url}`;
      setGeneratedImage(imageUrl);
      setGenerationParams(response.data.generation_params);
    } catch (err) {
      console.error('Error generating image:', err);
      console.error("❌ Generation error:", err);
      setError(err.response?.data?.detail || err.message || 'An error occurred while generating the image');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle downloading the generated image
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `sd-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle using an example prompt
  const handleUseExamplePrompt = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  // Generate a random seed
  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 2147483647).toString());
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Image Generator
      </Typography>
      <Typography variant="body1" paragraph>
        Enter a text prompt to generate an image using Stable Diffusion. Be descriptive for better results!
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }} className="generation-form">
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Prompt
              </Typography>
              <TextField
                fullWidth
                label="Describe what you want to see"
                multiline
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Need inspiration? Try one of these:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {examplePrompts.map((examplePrompt, index) => (
                  <Chip 
                    key={index} 
                    label={examplePrompt.substring(0, 20) + '...'} 
                    onClick={() => handleUseExamplePrompt(examplePrompt)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Advanced Settings
                <Tooltip title="These settings control how the AI generates your image">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              
              <TextField
                fullWidth
                label="Negative Prompt (what to avoid)"
                multiline
                rows={2}
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                sx={{ mb: 3 }}
              />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>Inference Steps: {numInferenceSteps}</Typography>
                  <Slider
                    value={numInferenceSteps}
                    onChange={(e, newValue) => setNumInferenceSteps(newValue)}
                    min={5}
                    max={20}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{ mb: 3 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>Guidance Scale: {guidanceScale}</Typography>
                  <Slider
                    value={guidanceScale}
                    onChange={(e, newValue) => setGuidanceScale(newValue)}
                    min={3}
                    max={10}
                    step={0.5}
                    valueLabelDisplay="auto"
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Width</InputLabel>
                    <Select
                      value={width}
                      label="Width"
                      onChange={(e) => setWidth(e.target.value)}
                    >
                      <MenuItem value={256}>256px</MenuItem>
                      <MenuItem value={512}>512px</MenuItem>
                      <MenuItem value={768}>768px</MenuItem>
                      <MenuItem value={1024}>1024px</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Height</InputLabel>
                    <Select
                      value={height}
                      label="Height"
                      onChange={(e) => setHeight(e.target.value)}
                    >
                      <MenuItem value={256}>256px</MenuItem>
                      <MenuItem value={512}>512px</MenuItem>
                      <MenuItem value={768}>768px</MenuItem>
                      <MenuItem value={1024}>1024px</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Seed (optional)"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    helperText="For reproducible results"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button 
                    variant="outlined" 
                    onClick={handleRandomSeed}
                    startIcon={<RefreshIcon />}
                    fullWidth
                  >
                    Random
                  </Button>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={isGenerating ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                disabled={isGenerating || !prompt}
                sx={{ mt: 4 }}
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </Button>
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: generatedImage ? 'flex-start' : 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}
          >
            {isGenerating ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Creating your masterpiece...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  This may take a few seconds
                </Typography>
              </Box>
            ) : generatedImage ? (
              <Box className="generated-image" sx={{ width: '100%' }}>
                <Card sx={{ mb: 2 }}>
                  <CardMedia
                    component="img"
                    image={generatedImage}
                    alt="Generated image"
                    sx={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {prompt}
                    </Typography>
                  </CardContent>
                </Card>
                
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  fullWidth
                >
                  Download Image
                </Button>
                
                {generationParams && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Generation Parameters:
                    </Typography>
                    <Typography variant="body2" component="pre" sx={{ 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      p: 1, 
                      borderRadius: 1,
                      overflow: 'auto',
                      fontSize: '0.75rem'
                    }}>
                      {JSON.stringify(generationParams, null, 2)}
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', color: 'text.secondary', p: 4 }}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" 
                  alt="placeholder" 
                  style={{ width: '120px', opacity: 0.5, marginBottom: '20px' }} 
                />
                <Typography variant="h6">
                  Your generated image will appear here
                </Typography>
                <Typography variant="body2">
                  Fill out the form and click Generate to create an image
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneratorPage;