import { createServer as createServerHttps } from 'https';
import { createServer as createServerHttp } from 'http';
import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import fs from 'fs';
import app from './app';
import { MONGODB_URI, PORT, KEY_PATH, CERT_PATH } from './config';

const httpsServer = createServerHttps(
  {
    key: fs.readFileSync(KEY_PATH!),
    cert: fs.readFileSync(CERT_PATH!),
  },
  app
);

const httpServer = createServerHttp(app);

const DEFAULT_PORT = 8000;

async function main() {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

    const usedPort = PORT || DEFAULT_PORT;
    httpServer.listen(usedPort, (): void => {
      console.log(`HTTP listen on port ${usedPort}`);
    });

    httpsServer.listen(8443, (): void => {
      console.log(`HTTPS listen on port ${8443}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
}

main();
