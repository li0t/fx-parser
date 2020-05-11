'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.
module.exports = {
  exit: true,
  bail: true,
  diff: true,
  opts: false,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 100000,
  ui: 'bdd',
  extension: ['ts'],
  spec: 'src/**/*.spec.ts',
  require: 'ts-node/register'
};
