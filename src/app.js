import { EOL, homedir } from 'os';
import process from 'process';

import { CommandHandler } from './handlers/commandHandler.js';
import { handleExit } from './handlers/exitHandler.js';
import { send } from './utils/common.js';
import { getLocationMessage, getWelcomeMessage } from './utils/messages.js';

export class FileManager {
  constructor({ args = [] } = {}) {
    this.args = args;
    this.userName = this._parseUserName();
    this.commandHandler = new CommandHandler({ path: homedir() });
  }

  _parseUserName() {
    const usernameArg = this.args.find((arg) => arg.startsWith('--username'));
    return usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
  }

  run() {
    send(getWelcomeMessage(this.userName));
    send(getLocationMessage(homedir()));

    process.on('exit', (code) => {
      handleExit({ code, userName: this.userName });
    });

    process.on('SIGINT', (code) => {
      handleExit({ code, userName: this.userName });
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log('uncaughtExceptionMonitor EXCEPTION:', err, origin);
    });

    this.listenConsole();
  }

  listenConsole() {
    process.stdin.on('data', (message) => {
      const commandString = message.toString().replace(EOL, '');

      if (commandString === '.exit') process.exit(1);

      if (this.commandHandler.checkIsBusy()) {
        send('Wait please. Operation in progress...');
        return;
      }

      this.commandHandler.run(commandString);
    });
  }
}
