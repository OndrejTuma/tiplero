/*
 * =========== OPENERS PROTOTYPE ===========
 */

const Openers = function (classes) {
    this.classes = classes;
    this.targetDatasetAttr = 'target';
};
Openers.prototype.registerListeners = function (ctx) {
    this.ctx = ctx;

    ctx.addEventListener('click', this._click.bind(this));

    ctx.querySelectorAll(`.${this.classes.opener}`).forEach(opener => {
        opener.classList.contains(this.classes.active) && this.open(opener, this._getTarget(opener));
    });
};
Openers.prototype._click = function (e) {
    if (!e.target.classList.contains(this.classes.opener)) {
        return;
    }

    const target = this._getTarget(e.target);

    if (!target) {
        return;
    }

    target.classList.contains(this.classes.targetActive)
        ? this.close(e.target, target)
        : this.open(e.target, target);
};
Openers.prototype._getTarget = function (opener) {
    if (!opener) {
        return;
    }

    return this.ctx.getElementById(opener.dataset[this.targetDatasetAttr]);
};
Openers.prototype.open = function (opener, target) {
    opener && opener.classList.add(this.classes.active);
    target && target.classList.add(this.classes.targetActive);
};
Openers.prototype.close = function (opener, target) {
    opener && opener.classList.remove(this.classes.active);
    target && target.classList.remove(this.classes.targetActive);
};