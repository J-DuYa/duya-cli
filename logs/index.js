const chalk = require('chalk');
const log = console.log;

module.exports = {
  info: message => {
    log(chalk.green(`✅ ${message}`));
  },
  warning: message => {
    log(chalk.red(`🌈 Warning ${message}`));
  }
}