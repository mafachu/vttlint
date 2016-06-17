'use strict';

const webvtt = require('node-webvtt');

const checks = {
    mindur: require('./lib/mindur'),
    maxdur: require('./lib/maxdur')
};

module.exports = function (file, opts) {

    opts = opts || {};

    const path = require('path');
    const fs = require('fs');

    file = file.trim();
    file = path.resolve(process.cwd(), file);

    let contents = '';
    try {
        contents = fs.readFileSync(file, 'utf8');
    } catch (e) {
        throw 'Error opening file ' + file + '.';
    }

    let parsed;
    let errors = [];

    // Parse VTT
    try {
        parsed = webvtt.parse(contents);
    } catch (parseErr) {
        return [{reason: parseErr.message}];
    }

    // Loop through VTT and do checks
    parsed.cues.forEach(function cueLoop (cue, i) {
        cue.index = i;
        Object.keys(checks).forEach(function getSuggestions (checkName) {
            if (opts[checkName] !== false) {
                errors = errors.concat(
                    checks[checkName](cue, opts[checkName])
                );
            }
        });
    });

    // Done
    return errors; // TODO: Dedup/Sort?

};
