import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import WithdrawForm from '../components/WithdrawForm';
import type { Product } from '../types/Product';
import { db } from '../firebaseConfig';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const WithdrawInventoryPage: React.FC = () => {
  const [rawInventory, setRawInventory] = useState<Product[]>([]);
  const [displayInventory, setDisplayInventory] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));

      setRawInventory(data);

      const groupedMap = new Map<string, Product>();
      data.forEach((item) => {
        if (groupedMap.has(item.name)) {
          const existing = groupedMap.get(item.name)!;
          groupedMap.set(item.name, {
            ...existing,
            quantity: existing.quantity + item.quantity,
          });
        } else {
          groupedMap.set(item.name, { ...item });
        }
      });

      setDisplayInventory(Array.from(groupedMap.values()));
    });

    return () => unsubscribe();
  }, []);

  const handleWithdraw = async (productName: string, quantityToWithdraw: number) => {
    const matchingItems = rawInventory
      .filter((item) => item.name === productName)
      .sort((a, b) => new Date(a.uploadTimestamp).getTime() - new Date(b.uploadTimestamp).getTime());

    let remaining = quantityToWithdraw;

    for (const item of matchingItems) {
      const productDoc = doc(db, 'inventory', item.id!);

      if (remaining <= 0) break;

      if (item.quantity > remaining) {
        await updateDoc(productDoc, {
          quantity: item.quantity - remaining,
        });
        remaining = 0;
      } else {
        await deleteDoc(productDoc);
        remaining -= item.quantity;
      }
    }
  };

  return (
    <>
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
        }}
      >
        <Typography variant="h4" gutterBottom>
          Withdraw Inventory
        </Typography>

        <WithdrawForm inventory={displayInventory} onWithdraw={handleWithdraw} />
      </Container>
    </>
  );
};

export default WithdrawInventoryPage;
