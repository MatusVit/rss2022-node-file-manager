import { resolve } from 'path';
import { send } from '../utils/common.js';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export const handleHash = async ({ path, args }) => {
  const [pathToFile] = args;
  const readStream = createReadStream(resolve(path, pathToFile));
  const hash = createHash('sha256');

  await new Promise((resolve, reject) => {
    readStream.on('readable', () => {
      const data = readStream.read();
      if (data) hash.update(data);
      else {
        send(hash.digest('hex'));
        resolve();
      }
    });

    readStream.on('error', (err) => reject(err));
  });

  return path;
};
