#!/usr/bin/env node

'use strict';

var minimist    = require('minimist'),
    path        = require('path'),
    fs          = require('fs'),
    vttlint     = require('../vttlint'),
    webvtt      = require('node-webvtt');

var exitCode    = 0,
    version,
    file;

// Get arguments
var args        = minimist(process.argv.slice(2), {
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
    console.log('\nDocumentation can be found at https://github.com/mafachu/vttlint/\n');
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
fs.readFile(file, 'utf8', function (readErr, data) {
    
    var suggestions;
    
    // Check for errors
    if (readErr) {
        return console.log('Error opening file ' + readErr.path + '.');
    }
    
    // Do checks
    suggestions = vttlint(data, args);
    suggestions.forEach(function (suggestion) {
        exitCode += suggestions.length;
        console.log(suggestion);
    });
    if (!suggestions.length) {
        console.log('No suggestions for ' + path.basename(file));
    }
    
    // Done
    process.exit(exitCode);
    
});
