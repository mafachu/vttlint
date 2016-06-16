#!/usr/bin/env node

'use strict';

const minimist  = require('minimist');
const path      = require('path');
const fs        = require('fs');
const vttlint   = require('../vttlint');

let exitCode    = 0;
let version;
let file;

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
    console.log('You did not provide any files to check.');
    process.exit(1);
} else {
    file = path.resolve(process.cwd(), args._[0].trim());
}

// Read file
fs.readFile(file, 'utf8', function readFile (readErr, data) {

    let suggestions;

    // Check for errors
    if (readErr) {
        return console.log('Error opening file ' + readErr.path + '.');
    }

    // Do checks
    suggestions = vttlint(data, args);
    suggestions.forEach(function suggestionDump (suggestion) {
        exitCode += suggestions.length;
        console.log();
        console.log(suggestion);
    });
    if (!suggestions.length) {
        console.log('No suggestions for ' + path.basename(file));
    }
    console.log();

    // Done
    process.exit(exitCode);

});
