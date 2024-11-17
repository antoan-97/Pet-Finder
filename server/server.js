const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Add this line to load Cloudinary configuration
require('./config/cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from localhost on ports 5173-5179
    if (!origin || /^http:\/\/localhost:(517[3-9])$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
// Define routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const petRoutes = require('./routes/petRoutes');
app.use('/api/pets', petRoutes);

const adoptionRoutes = require('./routes/adoptionRoutes');
app.use('/api/adoption', adoptionRoutes);


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log(process.env.MONGODB_URI)
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is loaded

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add these console logs at the start of your server.js
console.log('Server PORT:', process.env.PORT);
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('CORS Origin:', process.env.CORS_ORIGIN || 'http://localhost:5173');
