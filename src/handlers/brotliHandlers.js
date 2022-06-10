import { basename, resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

export const handleCompress = async ({ path, args }) => {
  const [pathToFile, pathToDestination] = args;
  const readStream = createReadStream(resolve(path, pathToFile));
  const writeStream = createWriteStream(resolve(path, pathToDestination, `${basename(pathToFile)}.br`));
  const brotliCompress = createBrotliCompress();

  await pipeline(readStream, brotliCompress, writeStream);

  return path;
};

export const handleDecompress = async ({ path, args }) => {
  const [pathToFile, pathToDestination] = args;
  const readStream = createReadStream(resolve(path, pathToFile));
  const writeStream = createWriteStream(resolve(path, pathToDestination, basename(pathToFile).slice(0, -3)));
  const brotliCompress = createBrotliDecompress();

  await pipeline(readStream, brotliCompress, writeStream);
  return path;
};
