# Jasmine Reporter Console

A simple jasmine reporter designed to display a reasonable level of output for your unit tests.

## Installation

```bash
$ npm install --save-dev jasmine-node-reporter
```

## Usage

In your helpers folder.

```js
const ConsoleReporter = require('jasmine-reporter-console');

jasmine.getEnv().clearReporters(); //Disables jasmine's default terse reporter

jasmine.getEnv().addReporter(new ConsoleReporter);
```

## Notes

For more information about how to use and configure jasmine, visit their [website](https://jasmine.github.io/).
