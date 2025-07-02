import mongoose from 'mongoose';

// Use environment variable for MongoDB URI in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tech:ow7rzHZysF8wcVkW@cluster0.szywy2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;
let connectionPromise: Promise<void> | null = null;

/**
 * Connect to MongoDB database
 * @returns Promise<void>
 */
async function dbConnect() {
  if (isConnected) {
    return;
  }

  // Prevent multiple simultaneous connection attempts
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      console.log('Attempting to connect to MongoDB...');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('MongoDB URI set:', !!process.env.MONGODB_URI);

      const options = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased timeout
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        // Add these options for better production stability
        maxIdleTimeMS: 30000,
        minPoolSize: 1,
      };

      await mongoose.connect(MONGODB_URI, options);
      isConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
      isConnected = false;
      connectionPromise = null;
      throw error;
    }
  })();

  return connectionPromise;
}

export default dbConnect; 