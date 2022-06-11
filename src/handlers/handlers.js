import { handleCompress, handleDecompress } from './brotliHandlers.js';
import { handleAdd, handleCat, handleCp, handleMv, handleRm, handleRn } from './fileSystemHandlers.js';
import { handleHash } from './hashHandlers.js';
import { handleCd, handleLs, handleUp } from './navigationHandlers.js';
import { handlerOs } from './osHandlers.js';

export const handlers = {
  //  'operator': handlerFunction / async({path, args}) => {return newPath}
  up: handleUp,
  cd: handleCd,
  ls: handleLs,

  cat: handleCat,
  add: handleAdd,
  rn: handleRn,
  cp: handleCp,
  mv: handleMv,
  rm: handleRm,

  os: handlerOs,

  hash: handleHash,

  compress: handleCompress,
  decompress: handleDecompress,
};
