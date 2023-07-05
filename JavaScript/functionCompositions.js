/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
    if (functions.length == 0) {
        return function (x) { return x; };
    }

    return functions.reduceRight(function (i, j) {
        return function (x) {
            return j(i(x));
        };
    });
};
