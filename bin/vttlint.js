#!/usr/bin/env node

'use strict';

const minimist  = require('minimist');

// Get arguments
const args      = minimist(process.argv.slice(2), {
    boolean: ['sync', 'clear'],
    alias: {
        h: 'help',
        v: 'version'
    }
});

// --help
if (args.help) {
    console.log('Usage: vttlint file.vtt [options]\n');
    console.log('Options:');
    console.log('  -v, --version    print vttlint.js version');
    console.log(
        '  --mindur=num     set minimum caption duration (false to disable)');
    console.log(
        '  --maxdur=num     set maximum caption duration (false to disable)');
    console.log(
        '\nDocumentation can be found at https://github.com/mafachu/vttlint/\n'
    );
    process.exit(0);
}

// --version
if (args.version) {
    const version = require('../package.json').version;
    console.log(version);
    process.exit(0);
}

// Normalize filename
if (args._.length < 1) {
    const msg = 'You did not provide any files to check.';
    throw msg;
}

const file = args._[0];

// Do checks
const vttlint = require('../vttlint');
const errors = vttlint(file, args);

// Reporter
const len = errors.length;
let str = '';
errors.forEach((err) => {
    const index = typeof(err.cue) === 'undefined' ? '?' : err.cue.index;
    str += 'cue ' + index + ': ' + err.reason + '\n';
});
if (str) {
    console.log(str + '\n' + len + ' error' +
        ((len === 1) ? '' : 's'));
}
console.log();

// Done
process.exit(0);
