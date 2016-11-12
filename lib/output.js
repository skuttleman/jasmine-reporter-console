const colors = require('colors/safe');

const logStrackTraces = stackTraces => {
  stackTraces.forEach(({ fullName, failedExpectations }) => {
    console.log('');
    console.log(colors.red(fullName));
    failedExpectations.forEach(logFailures);
  });
};

const logFinalMessage = (time, testCount, failures, skipped) => {
  let color = failures ? colors.red : skipped ? colors.yellow : colors.green;
  console.log('');
  console.log(`Finished in ${time.toFixed(3)} seconds`);
  console.log(color(`  ${testCount} Test(s), ${failures} Failure(s), ${skipped} Skipped`));
  console.log('');
};

const logFailures = ({ stack, message, expected, actual }) => {
  console.log('  ', stack);
  console.log('');
  console.log(colors.green('  expected:'), expected);
  console.log(colors.red('  actual:'), actual);
};

module.exports = {
  logStrackTraces,
  logFinalMessage
};
