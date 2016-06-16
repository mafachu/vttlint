'use strict';

const def = 1.333;

module.exports = function mindur (cue, min) {
    min = typeof min !== 'undefined' ? min : def;

    const dur = Math.round((cue.end - cue.start) * 1000) / 1000;
    const suggestions = [];

    if (dur < mindur) {
        suggestions.push({
            suggestion: 'Captions should have a minimum duration of ' +
                min + ' seconds.',
            cue: cue
        });
    }
    return suggestions;
};
