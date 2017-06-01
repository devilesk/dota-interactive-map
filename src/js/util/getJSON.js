function getJSON(path, callback) {
    var retries = 3;
    
    function makeReq() {
        var request = new XMLHttpRequest();

        request.open('GET', path, true);
        var err;
        request.onload = function() {
            if (request.status == 200) {
                console.log(request);
                console.log(request.status);
                try {
                    var data = JSON.parse(request.responseText);
                }
                catch (e) {
                    err = e;
                }
            }
            else {
                err = new Error("Error loading json " + request.status);
            }
            callback(err, data);
        };
        request.onerror = function() {
            retries--;
            if (retries > 0) {
                setTimeout(function () {
                    makeReq();
                }, 1000);
            }
            else {
                err = new Error("Error loading json " + request.status);
                callback(err);
            }
        };
        request.send();
    }
    
    makeReq();
}

export default getJSON;