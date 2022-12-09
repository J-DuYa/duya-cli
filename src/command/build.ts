import { merge } from 'lodash'
import { join } from 'path'
import chalk from 'chalk'
import { readdirSync, existsSync, readFileSync } from 'fs'
import rollup from './../rollup/rollup'
import getUserConfig from '../getUserConfig'
import { error } from './../logger'
import { DEFAULT_PLUGINS_DIRECTORY, CONFIG_JSON_NAME } from './../constants'

interface IDuyaBuildOpts {
  cwd: string;
  args: {
    [name: string]: any;
  }
}

interface IPluginCfg {
  name: string;
  plugins: Record<string, any>;
}

export default async function build ({ cwd, args }: IDuyaBuildOpts) {
  const { config:PLUGINS_PATH = DEFAULT_PLUGINS_DIRECTORY, ...userConfig } = merge(getUserConfig({ cwd }), args)
  const PLUGIN_DIR_PATH = join(cwd, PLUGINS_PATH)
  const isExistConfigFile = await existsSync(join(PLUGIN_DIR_PATH, CONFIG_JSON_NAME))
  let CONFIG_CONTENT: IPluginCfg = { name: '', plugins: {} }

  if (!isExistConfigFile) {
    error(`config.json file not found`)
  }

  try {
    const PluginBuffer = await readFileSync(join(PLUGIN_DIR_PATH, CONFIG_JSON_NAME))
    CONFIG_CONTENT = JSON.parse(PluginBuffer.toString())
    const pluginsCfg = CONFIG_CONTENT?.plugins || {}
    
    for (let pln in pluginsCfg) {
      if (Array.isArray(pluginsCfg[pln])) {
        const plnArray = pluginsCfg[pln];
        for (let idx = 0; idx < plnArray.length; idx ++) {
          if (typeof plnArray[idx] === 'string') {
            await rollup({ cwd, enrtyPath: plnArray[idx] })
          } else {
            error(`Plugin ${chalk.blueBright(pln)}: ${plnArray[idx]} is not in the correct format`)
          }
        }
      } else if (typeof pluginsCfg[pln] === 'string') {
        await rollup({ cwd, enrtyPath: pluginsCfg[pln] })
      } else {
        error(`${chalk.blueBright('Plugin ' + pln)}: ${JSON.stringify(pluginsCfg[pln])} is not in the correct format`)
      }
    }

  } catch (e: unknown) {
    error(e)
  }
}