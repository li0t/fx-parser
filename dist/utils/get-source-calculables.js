"use strict";
/**
 * @module fxSolve/utils/service/get-source-calculables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_object_calculables_1 = require("./get-object-calculables");
const get_array_calculables_1 = require("./get-array-calculables");
const is = require("fi-is");
/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculables array
 */
function getSourceCalculables(source) {
    if (is.object(source)) {
        return get_object_calculables_1.default(source);
    }
    else if (is.array(source)) {
        return get_array_calculables_1.default(source);
    }
    else {
        throw new Error(`Source must be and object or array: ${JSON.stringify(source)}`);
    }
}
exports.default = getSourceCalculables;
//# sourceMappingURL=get-source-calculables.js.map