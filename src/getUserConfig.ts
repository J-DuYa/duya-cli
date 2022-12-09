import { getExistFile } from './cli/node'
import { warn, error } from './logger'

interface IBundleOptions {

}

export const CONFIG_FILES = [
  '.duyarc.js',
  '.duyarc.ts'
];

function testDefault(obj: Record<string, any>) {
  return obj.default || obj;
}

export default function ({ cwd }: { cwd: string; }): IBundleOptions {
  const configFile = getExistFile({
    cwd,
    files: CONFIG_FILES,
    returnRelative: false,
  });

  let userConfig = {}

  if (!configFile) {
    warn(`Can\'t found config file: ${CONFIG_FILES.join(' or ')}`)
    return false
  }

  try {
    userConfig = testDefault(require(configFile))
  } catch (e) {
    error(e)
  }

  return userConfig
}