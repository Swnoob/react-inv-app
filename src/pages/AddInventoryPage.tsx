import React from 'react';
import { IconButton, Container, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import UploadCSV  from '../components/CSVUploader';
const AddInventoryPage: React.FC = () => {
  const navigate = useNavigate();

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
        <UploadCSV  />
      </Container>
    </>
  );
};

export default AddInventoryPage;
