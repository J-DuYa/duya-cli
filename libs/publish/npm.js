const { error, info } = require('@logger');
const execa = require('execa');

module.exports = () => {
  return new Promise(async (resolve) => {
    try {
      // 发布到 npm 上
      const { stderr, stdout } = await execa('npm', ['publish', '--access', 'public']);

      info(`发布依赖包成功\n${stderr}\n${stdout}\n`);

      resolve();

    } catch (e) {
      error(`发布 npm 包异常\n${e}`);
      process.exit(0);
    }
  })
}