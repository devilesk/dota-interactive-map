function getJSON(path, callback) {
    var request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            alert('Error loading page.');
        }
    };
    request.onerror = function() {
        alert('Error loading page.');
    };
    request.send();
    return request;
}

module.exports = getJSON;