'use strict';

const vttlint = require('../vttlint');

const tests = [{
        file: 'test1.vtt',
        expected: [{
            reason: 'No blank line after signature'
        }]
    }, {
        file: 'test2.vtt',
        expected: [{
            reason:
                'Captions should have a minimum duration of 1.333 seconds.',
            cue: {
                identifier: '',
                start: 32.5,
                end: 33.5,
                text: '<v Neil deGrasse Tyson><i>Laughs</i>',
                styles: 'align:left size:50%'
            }
        }, {
            reason: 'Captions should have a maximum duration of 6 seconds.',
            cue: {
                identifier: '',
                start: 35.5,
                end: 41.501,
                text:
                    '<v Roger Bingham>You know I’m so excited ' +
                    'my glasses are falling off here.',
                styles: ''
            }
        }]
    }, {
        file: 'test3.vtt',
        expected: []
    }];

console.log('\nRUNNING TESTS...');

tests.forEach(function doTest (test) {

    // Normalize filename
    const file = __dirname + '/' + test.file;

    // Do test;
    const errors = vttlint(file);

    // Output results;
    console.log('\nTesting ' + test.file + '...');
    console.log('====================');
    console.log('Expected: ');
    console.log(test.expected);
    console.log('Actual:');
    console.log(errors);

});

console.log();
