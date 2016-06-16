'use strict';

const merge = require('merge');
const webvtt = require('node-webvtt');

const defaultOpts = {
    mindur: 1.333,
    maxdur: 6
};

const checks = {
    mindur: require('./lib/mindur'),
    maxdur: require('./lib/maxdur')
};

module.exports = function (text, opts) {

    text = text || '';
    opts = merge(defaultOpts, opts);

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
