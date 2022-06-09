import { EOL } from 'os';
import process from 'process';
import { getExitMessage } from '../utils/messages.js';

export const handleExit = ({ code, userName }) => {
  if (code !== 0) console.log(getExitMessage(userName));
  process.exit(0);
};
