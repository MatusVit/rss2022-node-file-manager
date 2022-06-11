import { FileManager } from './src/app.js';

const fileManager = new FileManager({ args: process.argv.slice(2) });

fileManager.run();
