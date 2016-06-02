'use strict';

var fs      = require('fs'),
    vttlint = require('../vttlint');

var tests = [
    {
        file: 'test1.vtt',
        expected: [ { error: 'No blank line after signature' } ]
    },
    {
        file: 'test2.vtt',
        expected: []
    }
];

console.log('\nRUNNING TESTS...');

tests.forEach(function (test) {
    
    var contents, suggestions;
    
    // Read file
    contents = fs.readFileSync((__dirname + '/' + test.file), 'utf8');
    
    // Do test;
    suggestions = vttlint(contents);

    // Output results;
    console.log('\nTesting ' + test.file + '...');
    console.log('====================');
    console.log('Expected: ');
    console.log(test.expected);
    console.log('Actual:');
    console.log(suggestions);

});

console.log();
