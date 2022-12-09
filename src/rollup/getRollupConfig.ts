import { join } from 'path'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
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
      file: string;
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
  console.log('fileName', fileName)

  const {
    output = {
      format: 'umd',
      name: fileName,
      dir: 'dist'
    }
  } = require(join(projectPath, cfgPath as string))

  console.log('output?.name', output?.name)

  return {
    rollupCfg: {
      input: entry,
      output: {
        file: 'core.umd.js',
        dir: output?.dist || 'dist',
        format: output?.format,
        sourcemap: false,
        name: output?.name || fileName,
        inlineDynamicImports: true,
      },
      plugins: [
        babel({
          babelHelpers: 'bundled'
        }),
        uglify(),
        nodeResolve(),
        commonjs(),
        typescript()
      ]
    }
  }
}