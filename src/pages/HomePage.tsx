import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>

        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/add-inventory"
          >
            Add Inventory
          </Button>
        </Box>

        <Box mb={4}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            component={Link}
            to="/remove-inventory"
          >
            Withdraw Inventory
          </Button>
        </Box>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>📘 About This App (README)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left" fontSize="0.95rem">
              <strong>🛠️ Technologies Used:</strong><br />
              - <strong>React</strong>: Built with React and Material UI for UI components<br />
              - <strong>Firebase Firestore</strong>: Realtime database for storing inventory items<br />
              - <strong>Firebase Hosting</strong>: Deployed as a PWA on Firebase<br />
              - <strong>PWA (Progressive Web App)</strong>: Installable and offline-friendly<br />
              - <strong>PapaParse</strong>: Used to parse uploaded CSV files for batch inventory insertion<br /><br />
              
              <strong>🔁 Features:</strong><br />
              - Upload inventory via CSV file<br />
              - Group products by name and merge quantities<br />
              - Withdraw from the oldest inventory first (FIFO)<br />
              - Automatically removes product if its quantity reaches 0<br /><br />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default HomePage;
