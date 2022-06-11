import { arch, cpus, EOL, homedir, userInfo } from 'os';
import { send } from '../utils/common.js';

export const handlerOs = async ({ path, args }) => {
  const [key] = args;

  switch (key) {
    case '--EOL':
      send(JSON.stringify(EOL));
      break;

    case '--cpus':
      const cpusArray = cpus();
      send(`Total number of CPUs = ${cpusArray.length}`);
      send(cpusArray.map(({ model, speed }) => ({ model, speed })));
      break;

    case '--homedir':
      send(homedir());
      break;

    case '--username':
      send(userInfo().username);
      break;

    case '--architecture':
      send(arch());
      break;

    default:
      throw new Error(`Incorrect argument 'os'`);
  }

  return path;
};
