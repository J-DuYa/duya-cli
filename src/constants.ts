export const MIN_NODE_VERSION = 16
export const DEFAULT_CONFIG_FILES = ['.duyarc.ts', '.duyarc.js']
export const FRAMEWORK_NAME = '@duya/cli'
export const WATCH_DEBOUNCE_STEP = 300
export const BUILD_COMMANDS = ['build', 'prebundle']
export const DEBUG_BUNDLESS_NAME = '@duya/cli:bundless'
export const CACHE_PATH = 'node_modules/.cache/@duya/cli'
export const DEFAULT_BUNDLESS_IGNORES = [
  '**/.*',
  '**/.*/**',
  '**/*.md',
  '**/demos/**',
  '**/fixtures/**',
  '**/__{test,tests,snapshots}__/**',
  '**/*.{test,e2e,spec}.{js,jsx,ts,tsx}',
  '**/tsconfig.json',
]

// default plugin directory
export const DEFAULT_PLUGINS_DIRECTORY = '/plugins' 
export const CONFIG_JSON_NAME = 'config.json'