import mongoose from 'mongoose';

export default async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB connection error: Missing MONGO_URI in environment variables');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
