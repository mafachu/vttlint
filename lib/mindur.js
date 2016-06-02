'use strict';

module.exports = function (cue, mindur) {
    var dur = Math.round((cue.end - cue.start) * 1000) / 1000,
        suggestions = [];

    if (dur < mindur) {
        suggestions.push({
            suggestion: 'Captions should have a minimum duration of ' + mindur + ' seconds.',
            cue: cue
        });
    }
    
    return suggestions;
};
