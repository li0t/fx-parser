"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Builds a MongoDb valid ObjectId
 * @returns {String} A random id
 */
function getObjectId() {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16); //eslint-disable-line
    return (timestamp +
        'xxxxxxxxxxxxxxxx'
            .replace(/[x]/g, () => {
            return ((Math.random() * 16) | 0).toString(16); //eslint-disable-line
        })
            .toLowerCase());
}
exports.default = getObjectId;
//# sourceMappingURL=get-object-id.js.map