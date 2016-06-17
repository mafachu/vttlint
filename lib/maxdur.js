'use strict';

const def = 6;

module.exports = function maxdur (cue, max) {
    max = typeof max !== 'undefined' ? max : def;

    const dur = Math.round((cue.end - cue.start) * 1000) / 1000;
    const errors = [];

    if (dur > max) {
        errors.push({
            reason: 'Captions should have a maximum duration of ' +
                max + ' seconds.',
            cue: cue
        });
    }
    return errors;
};
