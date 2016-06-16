#!/usr/bin/env node

'use strict';

const minimist  = require('minimist');
const path      = require('path');

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
const suggestions = vttlint(file, args);
suggestions.forEach(function suggestionDump (suggestion) {
    console.log();
    console.log(suggestion);
});
if (!suggestions.length) {
    console.log('No suggestions for ' + path.basename(file));
}
console.log();

// Done
process.exit(0);
