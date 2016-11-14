const colors = require('colors/safe');

class Stats {
  constructor() {
    this.reset();
  }

  reset() {
    this.started = process.hrtime();
    this.indentation = '';
    this.testCount = 0;
    this.failures = 0;
    this.pending = 0;
    this.stackTraces = [];
  }

  spaceOut(message) {
    return `${this.indentation}${message}`;
  }

  log(message, color = m => m) {
    console.log(this.spaceOut(color(message)));
  }

  increaseIndent() {
    this.indentation += '  ';
  }

  decreaseIndent() {
    this.indentation = this.indentation.slice(2);
  }

  fail(description) {
    this.failures ++;
    this.log(description, colors.red);
  }

  succeed(description) {
    this.log(description, colors.green);
  }

  pend(description, pendingReason) {
    this.pending ++;
    this.log(`${description} (pending: ${pendingReason})`, colors.yellow);
  }
}

module.exports = new Stats;
