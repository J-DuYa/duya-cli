const { warning } = require('./../../logs');
const npm = require('./npm');
const push = require('./github');

/* 发布脚本 */
module.exports = async () => {
  // 为了广度使用支持发布到 github
  warning('为了广度使用支持发布到 github\n');

  await npm();

  await push();
};