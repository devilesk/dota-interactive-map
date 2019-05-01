function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this; const
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

export default debounce;
