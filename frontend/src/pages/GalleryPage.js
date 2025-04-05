import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import axios from 'axios';

const GalleryPage = () => {
  // State for gallery images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const imagesPerPage = 12;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for demonstration purposes
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
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      prompt: 'A photorealistic portrait of a fantasy character with detailed features',
      created_at: '2023-05-07T09:20:00Z',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1675271591211-126817a53f83',
      prompt: 'A cozy cafe interior with warm lighting and people reading books',
      created_at: '2023-05-06T13:10:00Z',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
      prompt: 'An underwater scene with colorful coral reefs and tropical fish',
      created_at: '2023-05-05T11:30:00Z',
    },
  ];

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get list of generated images from the backend API
        const response = await axios.get('/api/v1/images');
        
        // Process the response to create image objects
        // Since we don't have a dedicated API endpoint for images yet,
        // we'll use the file listing and create objects with the available information
        if (response.data && Array.isArray(response.data)) {
            const imageFiles = response.data.map((item, index) => ({
              id: index + 1,
              url: `/static/images/${item.filename}`,
              prompt: item.prompt || 'Untitled',
              created_at: item.created_at || new Date().toISOString()
            }));
          
            const filteredImages = searchTerm
              ? imageFiles.filter(img =>
                  img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : imageFiles;
          
            setImages(filteredImages);
            setTotalPages(Math.ceil(filteredImages.length / imagesPerPage));
          }
        
      } catch (err) {
        console.error('Error fetching images:', err);
        // Fall back to mock data if API call fails
        const filteredImages = searchTerm
          ? mockImages.filter(img => 
              img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : mockImages;
        
        setImages(filteredImages);
        setTotalPages(Math.ceil(filteredImages.length / imagesPerPage));
        setError('Could not load images from server. Showing sample images instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, searchTerm]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle delete
  const handleDeleteImage = async () => {
    try {
      const filename = selectedImage.url.split('/').pop();
      await axios.delete(`/api/v1/images/${filename}`);
      setImages(images.filter((img) => !img.url.endsWith(filename)));
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Failed to delete image');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Image Gallery
      </Typography>
      <Typography variant="body1" paragraph>
        Browse through the collection of AI-generated images. Click on an image to view details.
      </Typography>

      {/* Search bar */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by prompt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : images.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No images found. Try a different search term or generate some new images.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {images.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card sx={{ height: '100%' }} className="image-container">
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.url.startsWith('http') 
                      ? image.url
                      : `${window.location.origin}${image.url}`}
                    alt={image.prompt}
                    onClick={() => {
                      setSelectedImage(image);
                      setIsDialogOpen(true);
                    }}
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
                  <div className="prompt-overlay">
                    <Typography variant="body2">{image.prompt}</Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}

    {selectedImage && (
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>{selectedImage.prompt}</DialogTitle>
            <DialogContent>
                <img
                src={selectedImage.url.startsWith('http') ? selectedImage.url : `${window.location.origin}${selectedImage.url}`}
                alt={selectedImage.prompt}
                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Created: {formatDate(selectedImage.created_at)}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteImage} color="error">Delete</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogActions>
            </Dialog>
        )}
    </Container>
  );
};

export default GalleryPage;