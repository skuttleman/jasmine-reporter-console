const colors = require('colors/safe');
const stats = require('./stats');
const { logStrackTraces, logFinalMessage } = require('./output');

module.exports = class Reporter {
  jasmineStarted({ totalSpecsDefined }) {
    stats.reset();
    stats.testCount = totalSpecsDefined;
    stats.log(`Running tests: ${totalSpecsDefined} test(s) found.`);
  }

  suiteStarted({ description }) {
    if (!stats.indentation) console.log('');
    stats.log(description)
    stats.increaseIndent();
  }

  specDone({ status, description, pendingReason, failedExpectations, fullName }) {
    if (status === 'failed') stats.fail(description);
    else if (status === 'passed') stats.succeed(description);
    else stats.pend(description, pendingReason);
    if (failedExpectations.length) stats.stackTraces.push({ fullName, failedExpectations });
    failedExpectations.forEach(({ message }) => stats.log(`  ${message}`, colors.red));
  }

  suiteDone(result) {
    stats.decreaseIndent();
  }

  jasmineDone(suiteInfo) {
    let [start, stop] = process.hrtime(stats.started);
    let time = (stop - start) / 1000000000;
    logStrackTraces(stats.stackTraces);
    logFinalMessage(time, stats.testCount, stats.failures, stats.pending);
  }
}
