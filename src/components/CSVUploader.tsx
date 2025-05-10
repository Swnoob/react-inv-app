import React, { useState, type JSX } from 'react';
import { Button, Typography, Alert } from '@mui/material';
import Papa from 'papaparse';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import type { Product } from '../types/Product';

interface CSVRow {
  name: string;
  quantity: string;
  price: string;
}

const UploadCSV = (): JSX.Element => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setMessage(null);
    setError(null);

    if (!file) {
      setError('No file selected');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rawData = results.data as CSVRow[];
        const productsToUpload: Product[] = rawData
          .map((row) => {
            const name = row.name?.trim();
            const quantity = parseFloat(row.quantity?.trim());
            const price = parseFloat(row.price?.trim());

            if (!name || isNaN(quantity) || isNaN(price)) {
              return null;
            }

            return {
              name,
              quantity,
              price,
              uploadTimestamp: new Date().toISOString(),
            };
          })
          .filter((product): product is Product => product !== null);

        if (productsToUpload.length === 0) {
          setError('No valid products found in the CSV file.');
          return;
        }

        try {
          const inventoryRef = collection(db, 'inventory');
          const uploadPromises = productsToUpload.map(product => 
            addDoc(inventoryRef, product)
          );

          await Promise.all(uploadPromises);
          setMessage(`Successfully uploaded ${productsToUpload.length} product(s).`);
        } catch (err) {
          setError('Failed to upload products to database.');
        }
      },
      error: () => {
        setError('Failed to parse CSV file. Please check the format.');
      },
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Upload Inventory CSV
      </Typography>

      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Typography variant="body2" sx={{ mt: 2 }}>
        CSV format: name,quantity,price (header row required)
      </Typography>
    </div>
  );
};

export default UploadCSV;
