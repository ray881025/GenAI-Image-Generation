import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper, Box, Container, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Image as ImageIcon } from '@mui/icons-material';
import axios from 'axios';

const HomePage = () => {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock data for fallback if API fails
  const mockImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1675271591211-126817a53f83',
      prompt: 'A futuristic cityscape with flying cars and neon lights',
      created_at: '2023-05-10T14:30:00Z',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
      prompt: 'A serene landscape with mountains and a lake at sunset',
      created_at: '2023-05-09T10:15:00Z',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1686349719912-0a4c0a591c6c',
      prompt: 'An abstract painting with vibrant colors and geometric shapes',
      created_at: '2023-05-08T16:45:00Z',
    }
  ];
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Fetch featured images from the API
  useEffect(() => {
    const fetchFeaturedImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get list of generated images from the backend API
        const response = await axios.get('/api/v1/images');
        
        if (response.data && Array.isArray(response.data)) {
          const imageFiles = response.data.map((item, index) => ({
            id: index + 1,
            url: `/static/images/${item.filename}`,
            prompt: item.prompt || 'Untitled',
            created_at: item.created_at || new Date().toISOString()
          }));
          
          // Get the 3 most recent images
          const recentImages = imageFiles.slice(0, 3);
          setFeaturedImages(recentImages);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        // Fall back to mock data if API call fails
        setFeaturedImages(mockImages);
        setError('Could not load images from server. Showing sample images instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedImages();
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Generate Amazing Images with AI
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Experience the power of Stable Diffusion, a state-of-the-art text-to-image
              generative AI model. Create stunning visuals from simple text descriptions.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/generator"
              startIcon={<ImageIcon />}
              sx={{ mt: 2 }}
            >
              Start Generating
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                backgroundColor: 'background.paper',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)'
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                  <CircularProgress />
                </Box>
              ) : featuredImages.length > 0 ? (
                <Box
                  component="img"
                  src={featuredImages[0].url.startsWith('http') 
                    ? featuredImages[0].url
                    : `${window.location.origin}${featuredImages[0].url}`}
                  alt={featuredImages[0].prompt}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src="https://cdn.pixabay.com/photo/2023/05/25/ai-art-generator-800.jpg"
                  alt="AI Generated Art Example"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                  }}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {featuredImages.length > 0 && (
        <Box sx={{ my: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Recent AI Creations
          </Typography>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {featuredImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.url.startsWith('http') 
                      ? image.url
                      : `${window.location.origin}${image.url}`}
                    alt={image.prompt}
                    sx={{ cursor: 'pointer' }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {image.prompt}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Created: {formatDate(image.created_at)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      <Box sx={{ my: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>
                1. Enter Your Prompt
              </Typography>
              <Typography variant="body1">
                Describe what you want to see in your image. Be as detailed or abstract as you like.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>
                2. Customize Settings
              </Typography>
              <Typography variant="body1">
                Adjust parameters like image size, generation steps, and guidance scale to fine-tune your results.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>
                3. Generate & Download
              </Typography>
              <Typography variant="body1">
                Our AI will create your image in seconds. View, download, or generate variations of your creation.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;