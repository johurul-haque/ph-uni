import config from '@config';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

(async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(
        `Server running on ${config.port}\n${new Date().toTimeString()}`
      );
    });
  } catch (e) {
    console.log(e);
  }
})();

process.on('unhandledRejection', () => {
  console.log('Unhandled rejection detected. Shutting down server.');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception detected. Shutting down server.');
  process.exit(1);
});
