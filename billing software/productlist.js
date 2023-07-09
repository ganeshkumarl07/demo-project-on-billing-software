import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from API
    axios.get('/api/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
