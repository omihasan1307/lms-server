/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error during app initialization:', err);
    process.exit(1); // Exit if there’s a failure in DB connection
  }
}

main();

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.log(`😈 Unhandled Rejection: ${reason}`);
  console.log('Promise:', promise);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
