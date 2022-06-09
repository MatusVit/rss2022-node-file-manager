import { EOL } from 'os';

export const getLocationMessage = (path) => `You are currently in ${path}`;
export const getWelcomeMessage = (userName) => `Welcome to the File Manager, ${userName}!`;
export const getExitMessage = (userName) => `${EOL}Thank you for using File Manager, ${userName}!`;

export const failedOperationMessage = 'Operation failed';
