import { dirname, resolve, basename } from 'path';
import { rename, rm, writeFile } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

import { createSendStream } from '../utils/common.js';

export const handleCat = async ({ path, args }) => {
  await pipeline(createReadStream(resolve(path, args[0])), createSendStream());
  return path;
};

export const handleAdd = async ({ path, args }) => {
  await writeFile(resolve(path, args[0]), '', { flags: 'wx' });
  return path;
};

export const handleRn = async ({ path, args }) => {
  const [file, newFilename] = args;
  const pathToFile = resolve(path, file);
  await rename(pathToFile, resolve(dirname(pathToFile), newFilename));
  return path;
};

export const handleCp = async ({ path, args }) => {
  const [pathToFile, pathToNewDirectory] = args;

  const readStream = createReadStream(resolve(path, pathToFile));
  const writeStream = createWriteStream(resolve(path, pathToNewDirectory, basename(pathToFile)), { flags: 'wx' });
  await pipeline(readStream, writeStream);

  return path;
};

export const handleRm = async ({ path, args }) => {
  const [pathToFile] = args;
  await rm(resolve(path, pathToFile));
  return path;
};

export const handleMv = async ({ path, args }) => {
  const [pathToFile] = args;
  await handleCp({ path, args });
  await handleRm({ path, args: [pathToFile] });
  return path;
};
