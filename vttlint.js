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
    let suggestions = [];

    // Parse VTT
    try {
        parsed = webvtt.parse(contents);
    } catch (parseErr) {
        return [{error: parseErr.message}];
    }

    // Loop through VTT and do checks
    parsed.cues.forEach(function cueLoop (cue) {
        Object.keys(checks).forEach(function getSuggestions (checkName) {
            if (opts[checkName] !== false) {
                suggestions = suggestions.concat(
                    checks[checkName](cue, opts[checkName])
                );
            }
        });
    });

    // Done
    return suggestions; // TODO: Dedup/Sort?

};
