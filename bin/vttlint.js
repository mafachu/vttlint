#!/usr/bin/env node

'use strict';

const minimist  = require('minimist');
const path      = require('path');
const vttlint   = require('../vttlint');

let version;

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
    console.log('\nUsage: vttlint file.vtt [options]');
    console.log('\nOptions:');
    console.log('  -v, --version    print vttlint.js version');
    console.log(
        '\nDocumentation can be found at https://github.com/mafachu/vttlint/\n'
    );
    process.exit(0);
}

// --version
if (args.version) {
    version = require('../package.json').version;
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
