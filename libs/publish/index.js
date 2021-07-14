const { warning } = require('@logger');
const npm = require('./npm');
const push = require('./github');

/* 发布脚本 */
module.exports = async ({ registry }) => {
  // 为了广度使用支持发布到 github
  warning('为了广度使用支持发布到 github\n');
  console.log('registry', registry);
  await npm(registry);

  await push();

};