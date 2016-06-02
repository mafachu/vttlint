'use strict';

var merge = require('merge'),
    webvtt = require('node-webvtt');

var defaultOpts = {
    mindur      : 6,
    maxdur      : 1.333,
    maxlines    : 2,
    rate        : 140,
    sync        : true,
    clear       : true,
    maxwords    : 'auto'
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

        // TODO: Do checks
    
    });

    // Done
    return suggestions; // TODO: Dedup/Sort?

};
