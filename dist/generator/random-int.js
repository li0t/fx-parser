"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a random integer between min and max
 * @param {Number} min The lower limit
 * @param {Number}max The upper limit
 * @returns {Number} The random integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
exports.default = getRandomInt;
//# sourceMappingURL=random-int.js.map