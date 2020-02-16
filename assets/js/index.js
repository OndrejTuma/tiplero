const classes = {
    header: {
        active: 'header--menu-open',
    },
    openers: {
        active: 'opener--active',
        targetActive: 'opener__target--active',
        opener: 'opener',
    },
    tabs: {
        active: 'tabs__tab--active',
        tab: 'tabs__tab',
        tabs: 'tabs',
    },
};

const Tabs = function (classes) {
    this.classes = classes;
};
Tabs.prototype.registerListeners = function (ctx) {
    ctx.querySelectorAll(`.${this.classes.tabs}`).forEach(tabs => {
        tabs.addEventListener('click', e => {
            if (e.target.classList.contains(this.classes.tab)) {
                tabs.querySelectorAll(`.${this.classes.tab}`).forEach(elm => this.setTabInactive(elm, ctx));

                this.setTabActive(e.target, ctx);
            }
        });
    });
};
Tabs.prototype.setTabActive = function (elm, ctx) {
    elm.classList.add(this.classes.active);
    this.displayContainer(ctx.getElementById(elm.getAttribute('data-target')), 'block');
};
Tabs.prototype.setTabInactive = function (elm, ctx) {
    elm.classList.remove(this.classes.active);
    this.displayContainer(ctx.getElementById(elm.getAttribute('data-target')), 'none');
};
Tabs.prototype.displayContainer = function (elm, display) {
    if (elm) {
        elm.style.display = display;
    }
};


const Openers = function (classes) {
    this.classes = classes;
    this.targetDatasetAttr = 'target';
};
Openers.prototype.registerListeners = function (ctx) {
    this.ctx = ctx;

    ctx.addEventListener('click', this._click.bind(this));

    ctx.querySelectorAll(`.${this.classes.opener}`).forEach(opener => {
        console.log(opener, opener.classList.contains(this.classes.active));
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
Openers.prototype._getTarget = function(opener) {
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


(function (w, d) {
    // init of tabs on page
    const tabs = new Tabs(classes.tabs);
    tabs.registerListeners(d);
    // init openers on page
    const openers = new Openers(classes.openers);
    openers.registerListeners(d);
})(window, document);