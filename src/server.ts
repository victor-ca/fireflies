import express from 'express';
import mongoose from 'mongoose';
import { meetingRoutes } from './routes/meetings.js';
import { authMiddleware } from './auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://localhost:27017/meetingbot')
  .then((conn) => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MeetingBot API' });
});

// Apply auth middleware to all meeting routes
app.use('/api/meetings', authMiddleware, meetingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
