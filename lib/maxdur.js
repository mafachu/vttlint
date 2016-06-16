'use strict';

module.exports = function maxdur (cue, max) {
    const dur = Math.round((cue.end - cue.start) * 1000) / 1000;
    const suggestions = [];

    if (dur > max) {
        suggestions.push({
            suggestion: 'Captions should have a maximum duration of ' +
                max + ' seconds.',
            cue: cue
        });
    }
    return suggestions;
};
