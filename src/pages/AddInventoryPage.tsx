import React from 'react';
import { IconButton, Container, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CSVUploader from '../components/CSVUploader';
import type { Product } from '../types/Product';

const AddInventoryPage: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Dummy implementation for now — will later connect to Firebase
  const handleDataParsed = (data: Product[]) => {
    console.log("Parsed inventory data:", data);
    // Later: send data to Firebase
  };

  return (
    <>
      {/* Back Arrow at Top Left */}
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Inventory
        </Typography>

        {/* ✅ Now passing required prop */}
        <CSVUploader onDataParsed={handleDataParsed} />
      </Container>
    </>
  );
};

export default AddInventoryPage;
