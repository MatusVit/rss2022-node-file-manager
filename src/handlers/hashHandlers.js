import { join, resolve } from 'path';
import { readdir, stat } from 'fs/promises';
import { checkIsDirectory, send } from '../utils/common.js';
import { failedOperationMessage, invalidInputMassage } from '../utils/messages.js';

export const handleHash = async ({ path, args }) => {
  // todo ***
  return path;
};
