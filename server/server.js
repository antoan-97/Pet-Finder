const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Allow client app's origin
  credentials: true, // If you're using cookies or sessions
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
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log(process.env.MONGODB_URI)
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is loaded
