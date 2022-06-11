import { join, resolve } from 'path';
import { readdir, stat } from 'fs/promises';
import { checkIsDirectory, send } from '../utils/common.js';
import { failedOperationMessage, invalidInputMassage } from '../utils/messages.js';

export const handleUp = async ({ path }) => join(path, '..');

export const handleCd = async ({ path, args }) => {
  const newPath = resolve(path, args[0]);
  const isDirectory = await checkIsDirectory(newPath);
  if (isDirectory) return newPath;

  send(failedOperationMessage);
  return path;
};

export const handleLs = async ({ path }) => {
  const filesNameArray = await readdir(path);
  send(filesNameArray);
  return path;
};
