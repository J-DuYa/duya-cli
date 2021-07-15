/* 使用策略模式 */
const npm = require('./npm');
const push = require('./github');

module.exports = {
  /* 全部应用 */
  async publishAll (registry) {
    await npm(registry);
    await push();
  },
  /* 发布到代码仓库 */
  async publishDepository () {
    await push();
  },
  /* npm 包管理仓库 */
  async publishNPM (registry) {
    await npm(registry);
  },
}