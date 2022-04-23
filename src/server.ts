import { createServer } from 'http';
import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI, PORT } from './config';

const httpServer = createServer(app);
const DEFAULT_PORT = 8000;

async function main() {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

    const usedPort = PORT || DEFAULT_PORT;
    httpServer.listen(usedPort, (): void => {
      console.log(`Connected successfully on port ${usedPort}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
}

main();
