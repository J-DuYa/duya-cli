/**
* 初始化模版项目
* dir 建项目文件目录 不可能为空
*/
const { github, templates } = require('@config/config');
const { error, info, warning } = require('@logger');
const inquirer = require('inquirer');
const execa = require('execa');


function getSpaceAndTrim (name) {

  if (typeof name !== 'string') {
    error('非字符串不能解析');
    process.exit(0);
  }

  // 处理前后空格
  return name ? name.trim() : null;
}

module.exports = async dir => {
  try {
    let type;
    const PROGRAM_TYPE_OUTPUT = await inquirer.prompt([
      {
        type: 'list',
        message: '请选择项目类型',
        name: 'type',
        choices: [{
          key: 'app',
          name: '应用模版',
          value: 'app'
        }],
        default: 'app'
      }
    ]);

    type = PROGRAM_TYPE_OUTPUT.type;

    // 到了当前目录下面
    const PROGRAM_NAME_OUTPUT = await inquirer.prompt([
      {
        type: 'input',
        message: '请输入项目名称',
        name: 'name',
        default: 'duya-template'
      }
    ]);

    const name = getSpaceAndTrim(PROGRAM_NAME_OUTPUT?.name);

    if (!name) {
      warning('项目名称不能为空');
      return;
    }
    
    const PROGRAM = templates.filter(el => el.value === type)[0].programName;
    // clone 项目
    const { stderr } = await execa('git', ['clone', `${github}/${PROGRAM}.git`, name], {
      cwd: dir === '.' ? null : dir
    }); 

    info(`${stderr}`);
    info(`成功 Clone ${github}/${PROGRAM}.git 项目到${dir === '.' ? '当前目录' : dir}目录下, 项目名称 ${name}\n`);
    info(`cd ${name}`);
    info(`npm install\n`);

  } catch (e) {
    error(`初始化项目失败\n${e}`);
  }
};