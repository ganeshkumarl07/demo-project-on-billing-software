import React, { useState } from 'react';
import axios from 'axios';

const TotalAmount = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCalculateTotal = () => {
    axios.post('/api/calculateTotal', { items: selectedItems })
      .then(res => {
        setTotalAmount(res.data.totalAmount);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={handleCalculateTotal}>Calculate Total</button>
      <h2>Total Amount: ${totalAmount}</h2>
    </div>
  );
};

export default TotalAmount;
