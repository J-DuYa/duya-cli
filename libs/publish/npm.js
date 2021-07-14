const { error, info } = require('./../../logs');
const execa = require('execa');

module.exports = () => {
  return new Promise(async (resolve) => {
    try {
      // 发布到 npm 上
      const { stderr, stdout } = await execa('npm', ['publish', '--access', 'public', '--registry=https://registry.npmjs.org/']);

      info(`发布依赖包成功\n${stderr}\n${stdout}\n`);

      resolve();

    } catch (e) {
      error(`发布 npm 包异常\n${e}`);
      process.exit(0);
    }
  })
}