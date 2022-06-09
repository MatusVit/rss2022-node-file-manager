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
  const filesNameArray = await readdir(path, { withFileTypes: true, encoding: 'utf-8' });

  const dirListArray = filesNameArray.reduce(
    (acc, dirent) => {
      const [dirs, files] = acc;
      if (dirent.isFile()) files.push(dirent.name);
      else if (dirent.isDirectory()) dirs.push(`[ ${dirent.name} ]`);
      else if (dirent.isSymbolicLink()) files.push(`* ${dirent.name} * - symbol link`);
      return acc;
    },
    [[], []]
  );

  send(dirListArray.flat().join('\n'));
  return path;
};
