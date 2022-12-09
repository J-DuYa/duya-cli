#!/usr/bin/env node

require('v8-compile-cache');
require('../dist/cli/cli')
  .run()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })