'use strict';

module.exports = function (cue, maxdur) {
    var dur = Math.round((cue.end - cue.start) * 1000) / 1000,
        suggestions = [];

    if (dur > maxdur) {
        suggestions.push({
            suggestion: 'Captions should have a maximum duration of ' + maxdur + ' seconds.',
            cue: cue
        });
    }
    
    return suggestions;
};
