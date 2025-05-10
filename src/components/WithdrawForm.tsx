import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material';
import type { Product } from '../types/Product';

interface WithdrawFormProps {
  inventory: Product[];
  onWithdraw: (productName: string, quantity: number) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ inventory, onWithdraw }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [remainingStock, setRemainingStock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const product = inventory.find(item => item.name === selectedProduct);
    setRemainingStock(product?.quantity ?? null);
  }, [selectedProduct, inventory]);

  const handleWithdraw = () => {
    setError(null);
    setSuccess(null);

    const qty = parseInt(quantity, 10);

    if (!selectedProduct || isNaN(qty) || qty <= 0) {
      setError('Please select a product and enter a valid quantity.');
      return;
    }

    const product = inventory.find(item => item.name === selectedProduct);
    if (!product) {
      setError('Selected product not found.');
      return;
    }

    if (qty > product.quantity) {
      setError(`Cannot withdraw more than ${product.quantity} items.`);
      return;
    }

    console.log('Calling onWithdraw from WithdrawForm');
    onWithdraw(selectedProduct, qty);
    setSuccess(`Successfully withdrew ${qty} ${selectedProduct}(s).`);
    setQuantity('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Withdraw Product
      </Typography>

      <TextField
        select
        fullWidth
        label="Select Product"
        value={selectedProduct}
        onChange={(e) => {
          setSelectedProduct(e.target.value);
          setQuantity('');
          setSuccess(null);
          setError(null);
        }}
        sx={{ mb: 2 }}
      >
        {inventory.map((product) => (
          <MenuItem key={product.name} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>

      {remainingStock !== null && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          Quantity Available: {remainingStock}
        </Typography>
      )}

      <TextField
        type="number"
        fullWidth
        label="Quantity to Withdraw"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: 1 }}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleWithdraw}
      >
        Withdraw
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
    </Box>
  );
};

export default WithdrawForm;
