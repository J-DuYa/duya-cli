module.exports = {
  /* 去除空格 */
  getSpaceAndTrim (name) {

    if (typeof name !== 'string') {
      error('非字符串不能解析');
      process.exit(0);
    }
  
    // 处理前后空格
    return name ? name.trim() : null;
  }
}