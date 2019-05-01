import trim from './trim';

const getParameterByName = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const setQueryString = (key, value) => {
    if (history && history.replaceState) history.replaceState(null, '', updateQueryString(key, value));
};

const addQueryStringValue = (key, value) => {
    let qs = getParameterByName(key);
    qs = trim(`${trim(qs, ' ;')};${value}`, ' ;');
    if (history && history.replaceState) history.replaceState(null, '', updateQueryString(key, qs));
};

const removeQueryStringValue = (key, value) => {
    let qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
    if (history && history.replaceState) history.replaceState(null, '', updateQueryString(key, qs != '' ? qs : null));
};

const updateQueryString = (key, value, url) => {
    if (!url) url = window.location.href;
    const re = new RegExp(`([?&])${key}=.*?(&|#|$)(.*)`, 'gi');
    let hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null) return url.replace(re, `$1${key}=${value}$2$3`);

        hash = url.split('#');
        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += `#${hash[1]}`;
        return url;
    }
    if (typeof value !== 'undefined' && value !== null) {
        const separator = url.indexOf('?') !== -1 ? '&' : '?';
        hash = url.split('#');
        url = `${hash[0] + separator + key}=${value}`;
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
            url += `#${hash[1]}`;
        }
        return url;
    }
    return url;
};

export {
    getParameterByName,
    setQueryString,
    addQueryStringValue,
    removeQueryStringValue,
    updateQueryString,
};
