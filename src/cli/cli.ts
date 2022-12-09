import yParser from 'yargs-parser'
import { checkVersion, setNodeTitle, setNoDeprecation } from './node'
import build from './../command/build'
import module from './../command/module'
import init from './../command/init'
import { warn } from './../logger'

interface Arguments {
  /** Non-option arguments */
  _: string[];
  /** The script name or node command */
  $0: string;
  /** All remaining options */
  [argName: string]: any;
}

interface IOpts {
  args?: Arguments;
}

const cwd = process.cwd()

export async function run (_opts?: IOpts) {
  checkVersion()
  setNodeTitle()
  setNoDeprecation()

  const args =
  _opts?.args ||
  yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    boolean: ['version'],
  })

  const command = args._[0]

  switch (command) {
    case 'build':
      await build({ cwd, args })
      break
    case 'build:module':
      await module()
      break
    case 'init':
      await init()
      break
    default:
      warn(`@duya/cli does not support this directive temporarily!
current support:
  build
  build:module [package.json's name]
  init
      `)
      break;
  }
}