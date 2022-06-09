import { join, resolve } from 'path';
import { readdir, stat } from 'fs/promises';
import { checkIsDirectory, send } from '../utils/common.js';
import { failedOperationMessage, invalidInputMassage } from '../utils/messages.js';

export const handleCompress = async ({ path, args }) => {
  // todo ***
  return path;
};

export const handleDecompress = async ({ path, args }) => {
  // todo ***
  return path;
};
