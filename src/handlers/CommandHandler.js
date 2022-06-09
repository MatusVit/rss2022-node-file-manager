import { EOL, homedir } from 'os';
import { send } from '../utils/common.js';
import { failedOperationMessage, getLocationMessage, invalidInputMassage } from '../utils/messages.js';
import { handlers } from './handlers.js';

const STATUS = {
  FREE: 'free',
  BUSY: 'busy',
};

export class CommandHandler {
  constructor({ path }) {
    this.currentPath = path || homedir();
    this.status = STATUS.FREE;
  }

  getStatus() {
    return this.status;
  }

  checkIsBusy() {
    return this.status === STATUS.BUSY;
  }

  async run(commandString) {
    const [operator, ...operatorArgs] = commandString.replace(/\s{2,}/g, ' ').split(' ');
    const handleOperator = handlers[operator];

    if (!handleOperator) {
      send(invalidInputMassage);
      return;
    }

    try {
      this.status = STATUS.BUSY;
      this.currentPath = await handleOperator({ path: this.currentPath, args: operatorArgs });
    } catch (error) {
      send('oops! ERROR: \n', error); // ! *** ???
      send(failedOperationMessage);
    } finally {
      this.status = STATUS.FREE;
    }

    send(getLocationMessage(this.currentPath));
  }
}
