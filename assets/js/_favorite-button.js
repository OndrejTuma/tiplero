/*
 * =========== FAVORITE BUTTON PROTOTYPE ===========
 */

const FavoriteButton = function (elm, url, classes) {
    if (!elm) {
        return;
    }

    this.button = elm;
    this.url = url;
    this.classes = classes;
    this.req = new Fetch(url);
    this.id = elm.dataset.id;
};
FavoriteButton.prototype.register = function () {
    if (!this.button) {
        return;
    }

    this.button.addEventListener('click', this._click.bind(this));
};
FavoriteButton.prototype._click = function () {
    this.button.classList.add(this.classes.busy);
    this.req.send('POST', {
        id: this.id,
        favorite: !this._isActive(),
    }, this._success.bind(this), this._error.bind(this), this._final.bind(this));
};
FavoriteButton.prototype._isActive = function () {
    return this.button.classList.contains(this.classes.active);
};
FavoriteButton.prototype._success = function () {
    this._isActive()
        ? this.button.classList.remove(this.classes.active)
        : this.button.classList.add(this.classes.active);
};
FavoriteButton.prototype._error = function (data) {
    console.error('request failed', data);
};
FavoriteButton.prototype._final = function () {
    this.button.classList.remove(this.classes.busy);
};