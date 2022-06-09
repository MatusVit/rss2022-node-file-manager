import { join } from 'path';
import { readdir } from 'fs/promises';

export const upHandler = async ({ path }) => join(path, '..');

export const cdHandler = async ({ path, args }) => {
  console.log('cdHandler args=', args);

  return join(path, args[0]);
};

export const lsHandler = async ({ path, args }) => {
  console.log('lsHandler args=', args);
  const filesNameArray = await readdir(path);
  console.log(filesNameArray);
  return path;
};
