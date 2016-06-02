#!/usr/bin/env node

'use strict';

var minimist    = require('minimist'),
    path        = require('path'),
    fs          = require('fs'),
    webvtt      = require('node-webvtt');

var exitCode    = 0,
    version,
    file,
    parsed;

// Get arguments
var args        = minimist(process.argv.slice(2), {
    boolean: ['sync', 'clear'],
    alias: {
        h: 'help',
        v: 'version'
    },
    'default': {
        file        : '',
        mindur      : 6,
        maxdur      : 1.333,
        maxlines    : 2,
        rate        : 140,
        sync        : true,
        clear       : true,
        maxwords    : 'auto'
    }
});

// --help
if (args.help) {
    console.log('\nUsage: vttlint file.vtt [options]');
    console.log('\nOptions:');
    console.log('  -v, --version    print vttlint.js version');
    console.log('\nDocumentation can be found at https://github.com/mafachu/vttlint/\n')
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
    
    // Check for errors
    if (readErr) {
        return console.log('Error opening file ' + readErr.path + '.');
    }
    
    // Parse VTT
    try {
        parsed = webvtt.parse(data);
    } catch (parseErr) {
        return console.log(parseErr.message);
    }
    
    console.log(path.basename(file) + ' passed WebVTT validation. ' + parsed.cues.length + ' cues parsed.');
    
    // Loop through VTT and do checks
    parsed.cues.forEach(function (cue) {
        
        // TODO: Do checks
        
    });
    
    // Done
    process.exit(exitCode);
    
});
