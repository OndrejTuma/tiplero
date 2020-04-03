/*
 * =========== FETCH PROTOTYPE ===========
 */

const Fetch = function (url) {
    this.url = url;
    this.request = new XMLHttpRequest();
};
Fetch.prototype.send = function (method, params, success, error, final) {
    this.request.onreadystatechange = function () {
        if (this.request.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(this.request.responseText);

            if (this.request.status == 200) {
                typeof success === 'function' && success(response);
            } else {
                typeof error === 'function' && error(response);
            }

            typeof final === 'function' && final(response);
        }
    }.bind(this);

    this.request.open(method, this.url, true);
    this.request.send(this._stringifyParams(params));
};
Fetch.prototype._stringifyParams = function (params) {
    if (!params || typeof params !== 'object') {
        return;
    }

    return new URLSearchParams(params).toString();

    /* obsolete
    return Object.keys(params).map(k => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&');
     */
};

export default Fetch;