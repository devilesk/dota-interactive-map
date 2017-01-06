var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, array[i], i); // passes back stuff we need
    }
};

module.exports = forEach;