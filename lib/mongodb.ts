import mongoose from 'mongoose';

// Use environment variable for MongoDB URI in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tech:ow7rzHZysF8wcVkW@cluster0.szywy2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;

/**
 * Connect to MongoDB database
 * @returns Promise<void>
 */
async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
}

export default dbConnect; 