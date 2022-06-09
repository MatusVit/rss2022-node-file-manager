import { cdHandler, lsHandler, upHandler } from './navigationHandlers.js';

export const handlers = {
  //  'operator': handlerFunction / async({path, args}) => {return newPath}
  up: upHandler,
  cd: cdHandler,
  ls: lsHandler,
};
