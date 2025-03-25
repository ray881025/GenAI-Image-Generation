import React from 'react';
import { Typography, Button, Grid, Paper, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Image as ImageIcon } from '@mui/icons-material';

const HomePage = () => {
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
            </Paper>
          </Grid>
        </Grid>
      </Box>

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