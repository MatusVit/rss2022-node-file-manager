import { join } from 'path';
import { stat } from 'fs/promises';

export const send = (message) => {
  console.log(`${message}`);
};

export const checkIsDirectory = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    // console.log('ERROR checkIsDirectory ', error); // ! ***
    return false;
  }
};
