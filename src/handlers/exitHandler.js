import { EOL } from 'os';
import process from 'process';
import { send } from '../utils/common.js';
import { getExitMessage } from '../utils/messages.js';

export const handleExit = ({ code, userName }) => {
  if (code !== 0) send(getExitMessage(userName));
  process.exit(0);
};
