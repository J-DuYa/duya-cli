import { rollup } from 'rollup'
import { join } from 'path'
import getRollupConfig from './getRollupConfig'
import { error } from './../logger'
import { getExistFile } from './../cli/node'

export default async function rollupRunner ({ cwd, enrtyPath }: { cwd: string; enrtyPath: string; }) {
  try {
    const projectPath = join(cwd, enrtyPath)
    const entry = getExistFile({
      cwd: projectPath,
      files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js', 'src/main.js', 'src/main.ts'],
      returnRelative: true,
    })
  
    if (!entry) {
      error('Entry file is not exist.')
    }

    const EntryFile = join(projectPath, entry as string)
    const { rollupCfg } = getRollupConfig({
      entry: EntryFile,
      projectPath
    })
  
    const bundle = await rollup(rollupCfg)
  
    await bundle.write({
      format: rollupCfg?.output.format,
      exports: 'named',
      extend: true,
      sourcemap: rollupCfg?.output.sourcemap,
      file: join(projectPath, 'dist/index.js'),
      globals: {

      },
      name: 'duya'
    })
  } catch (e: unknown) { error(e) }
}