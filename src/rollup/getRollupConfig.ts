import { join } from 'path'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import { error } from './../logger'
import { DEFAULT_CONFIG_FILES } from './../constants'
import { getExistFile } from './../cli/node'

interface IBundleConfig {
  entry: string;
  projectPath: string;
}

interface IRollupConfig {
  rollupCfg: {
    input: string;
    output: {
      dir: string;
      format: 'umd' | 'esm',
      sourcemap: boolean;
      name: string;
      inlineDynamicImports: boolean;
    },
    plugins: Array<any>;
  };
}

export default function getRollupConfig ({
  entry,
  projectPath,
}: IBundleConfig): IRollupConfig {
  const cfgPath = getExistFile({
    cwd: projectPath,
    files: DEFAULT_CONFIG_FILES,
    returnRelative: true,
  })

  if (!cfgPath) {
    error('.duyarc.js or .duyarc.ts file is not exist.')
  }

  const fileName = projectPath.split('/')[projectPath.split('/').length - 1]

  const {
    output = {
      format: 'umd',
      name: fileName,
      dir: 'dist'
    }
  } = require(join(projectPath, cfgPath as string))

  return {
    rollupCfg: {
      input: entry,
      output: {
        dir: output?.dist,
        format: output?.format,
        sourcemap: false,
        name: output?.name,
        inlineDynamicImports: true,
      },
      plugins: [
        babel({
          babelHelpers: 'bundled'
        }),
        nodeResolve(),
        commonjs(),
        typescript()
      ]
    }
  }
}