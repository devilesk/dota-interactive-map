const getJSON = (path, callback) => {
    let retries = 3;

    const makeReq = () => {
        const request = new XMLHttpRequest();

        request.open('GET', path, true);
        let err;
        request.onload = () => {
            let data;
            if (request.status == 200) {
                console.log(request);
                console.log(request.status);
                try {
                    data = JSON.parse(request.responseText);
                }
                catch (e) {
                    err = e;
                }
            }
            else {
                err = new Error(`Error loading json ${request.status}`);
            }
            callback(err, data);
        };
        request.onerror = () => {
            retries--;
            if (retries > 0) {
                setTimeout(makeReq, 1000);
            }
            else {
                err = new Error(`Error loading json ${request.status}`);
                callback(err);
            }
        };
        request.send();
    };

    makeReq();
};

export default getJSON;
