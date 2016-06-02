'use strict';

var merge = require('merge'),
    webvtt = require('node-webvtt');

var defaultOpts = {
    mindur      : 1.333,
    maxdur      : 6
};

var checks = {
    mindur      : require('./lib/mindur'),
    maxdur      : require('./lib/maxdur')
};

module.exports = function (text, opts) {

    text = text || '';
    opts = merge(defaultOpts, opts);

    var parsed,
        suggestions = [];
    
    // Parse VTT
    try {
        parsed = webvtt.parse(text);
    } catch (parseErr) {
        return [{error: parseErr.message}];
    }
    
    // Loop through VTT and do checks
    parsed.cues.forEach(function (cue) {
        Object.keys(checks).forEach(function (checkName) {
            if (opts[checkName] !== false) {
                suggestions = suggestions.concat(checks[checkName](cue, opts[checkName]));
            }
        });
    });

    // Done
    return suggestions; // TODO: Dedup/Sort?

};
