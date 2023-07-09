const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Item schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.get('/api/items', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(items);
    }
  });
});

app.post('/api/calculateTotal', (req, res) => {
  const { items } = req.body;
  let totalAmount = 0;

  Item.find({ _id: { $in: items } }, (err, selectedItems) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      selectedItems.forEach(item => {
        totalAmount += item.price;
      });
      res.json({ totalAmount });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
