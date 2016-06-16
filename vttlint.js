'use strict';

const webvtt = require('node-webvtt');

const checks = {
    mindur: require('./lib/mindur'),
    maxdur: require('./lib/maxdur')
};

module.exports = function (text, opts) {

    text = text || '';

    let parsed;
    let suggestions = [];

    // Parse VTT
    try {
        parsed = webvtt.parse(text);
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
