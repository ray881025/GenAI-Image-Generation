import React from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Divider,
  Link,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  Brush as BrushIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        About This Project
      </Typography>
      
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          GenAI Image Generation Application
        </Typography>
        <Typography variant="body1" paragraph>
          This project demonstrates the practical application of generative AI for image creation. 
          It uses the Stable Diffusion model, which has been trained on millions of image-text pairs 
          to generate high-quality images from textual descriptions.
        </Typography>
        <Typography variant="body1" paragraph>
          The implementation follows a microservices architecture with separate frontend and backend 
          components that communicate via RESTful APIs. The backend handles the interaction with the 
          AI model, while the frontend provides an intuitive user interface.
        </Typography>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Technology Stack
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Backend" 
                  secondary="Python with FastAPI, providing a modern, high-performance framework for building APIs" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BrushIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Frontend" 
                  secondary="React.js with Material-UI, creating a responsive and intuitive user interface" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PsychologyIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="AI Model" 
                  secondary="Stable Diffusion via Diffusers library, a state-of-the-art text-to-image generative model" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Deployment" 
                  secondary="Docker containers for consistent and scalable deployment across environments" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              How Stable Diffusion Works
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic 
              images given any text input. The model works through a process called "diffusion":
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Step 1: Text Understanding" 
                  secondary="The model first encodes your text prompt to understand what you're asking for" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Step 2: Noise Generation" 
                  secondary="It starts with random noise and gradually refines it based on your prompt" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Step 3: Denoising Process" 
                  secondary="Through multiple iterations, it removes noise and adds details matching your description" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Step 4: Final Image" 
                  secondary="The result is a high-quality image that represents your text prompt" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Resources
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://huggingface.co/front/assets/huggingface_logo.svg"
                alt="Hugging Face"
                sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hugging Face
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The AI community building the future. Home to the Diffusers library that powers this application.
                </Typography>
                <Link href="https://huggingface.co/" target="_blank" rel="noopener" sx={{ mt: 1, display: 'block' }}>
                  Visit Hugging Face
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
                alt="FastAPI"
                sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  FastAPI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A modern, fast web framework for building APIs with Python based on standard type hints.
                </Typography>
                <Link href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener" sx={{ mt: 1, display: 'block' }}>
                  Visit FastAPI
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                alt="React"
                sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  React
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A JavaScript library for building user interfaces, making it painless to create interactive UIs.
                </Typography>
                <Link href="https://reactjs.org/" target="_blank" rel="noopener" sx={{ mt: 1, display: 'block' }}>
                  Visit React
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;