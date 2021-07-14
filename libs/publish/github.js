const { error, info } = require('@logger');
const execa = require('execa');

module.exports = () => {
  return new Promise(async resolve => {
    try {

      // 缓存代码
      await execa('git', ['add', '.']);

      // 编辑提交信息 暂时写死
      await execa('git', ['commit', '-m', 'feat: 这是脚手架 push 的代码']);

      // 提交代码
      const { stderr } = await execa('git', ['push', 'origin', 'master']);

      info(`同步代码仓库成功\n${stderr}\n`);

      resolve();

    } catch (e) {
      error(`同步代码仓库异常\n${e}`);
      process.exit(0);
    }
  });
}