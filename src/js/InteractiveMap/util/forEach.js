const forEach = (array, callback, scope) => {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, array[i], i); // passes back stuff we need
    }
};

export default forEach;
