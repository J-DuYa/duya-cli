import { existsSync } from 'fs'
import { join } from 'path'
import { FRAMEWORK_NAME, MIN_NODE_VERSION } from '../constants';
import { error } from '../logger'

export function checkVersion () {
  const v = parseInt(process.version.slice(1));
  if (v < MIN_NODE_VERSION) {
    error(
      `Your node version ${v} is not supported, please upgrade to ${MIN_NODE_VERSION} or above except 15 or 17 or 18.`,
    );
    process.exit(1);
  }
}

export function setNodeTitle(name?: string) {
  if (process.title === 'node') {
    process.title = name || FRAMEWORK_NAME;
  }
}

export function setNoDeprecation() {
  // Use magic to suppress node deprecation warnings
  // See: https://github.com/nodejs/node/blob/master/lib/internal/process/warning.js#L77
  // @ts-ignore
  process.noDeprecation = '1';
}

/**
 * Check for configuration files
*/
export function getExistFile({ cwd, files, returnRelative }: {
  cwd: string;
  files: Array<string>;
  returnRelative: boolean;
}) {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
}