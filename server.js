const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runHandler = (filePath) => {
  let handler;
  try {
    handler = require('./' + filePath);
  } catch (err) {
    console.error('Failed to load: ' + filePath, err.message);
    handler = (req, res) => res.status(500).json({ error: 'Handler not found' });
  }
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
       console.error(err);
       if (!res.headersSent) {
          res.status(500).json({ error: 'Internal Server Error' });
       }
    }
  };
};

// Vercel Local Dev Mode Mapping
app.post('/api/auth/register', runHandler('api/auth/register'));
app.post('/api/auth/login', runHandler('api/auth/login'));
app.get('/api/auth/me', runHandler('api/auth/me'));

app.get('/api/products', runHandler('api/products/index'));
app.get('/api/products/:id', (req, res) => {
  req.query.id = req.params.id; 
  runHandler('api/products/[id]')(req, res);
});

// User routes
app.all('/api/user/profile', runHandler('api/user/profile'));
app.get('/api/user/orders', runHandler('api/user/orders'));


app.post('/api/payment/checkout', runHandler('api/payment/checkout'));
app.post('/api/payment/callback', runHandler('api/payment/callback'));

app.all('/api/admin/products', runHandler('api/admin/products'));
app.all('/api/admin/orders', runHandler('api/admin/orders'));
app.all('/api/admin/users', runHandler('api/admin/users'));
app.post('/api/admin/ai-generate', runHandler('api/admin/ai-generate'));

app.use(express.static(__dirname));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Development server is running! Open http://localhost:${PORT} in your browser.`);
});
