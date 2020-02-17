const classes = {
    header: {
        active: 'header--menu-open',
    },
    favBtn: {
        active: 'claim__favorite--is-favorite',
        busy: 'claim__favorite--busy',
    },
    openers: {
        active: 'opener--active',
        targetActive: 'opener__target--active',
        opener: 'opener',
    },
    tabs: {
        active: 'tabs__tab--active',
        targetActive: 'tabs__target--active',
        tab: 'tabs__tab',
        tabs: 'tabs',
    },
};

const Tabs = function (classes) {
    this.classes = classes;
};
Tabs.prototype.registerListeners = function (ctx) {
    this.ctx = ctx;
    this.tabsGroups = ctx.querySelectorAll(`.${this.classes.tabs}`);

    this.tabsGroups.forEach(tabs => {
        tabs.addEventListener('click', e => {
            if (e.target.classList.contains(this.classes.tab)) {
                tabs.querySelectorAll(`.${this.classes.tab}`).forEach(elm => this.setTabInactive(elm));

                this.setTabActive(e.target);
            }
        });

        const activeTab = tabs.querySelector(`.${this.classes.tab}.${this.classes.active}`);

        if (activeTab) {
            this.setTabActive(activeTab);
        }
    });
};
Tabs.prototype.setTabActive = function (elm) {
    elm.classList.add(this.classes.active);
    this.displayContainer(this.ctx.getElementById(elm.getAttribute('data-target')), 'block');
};
Tabs.prototype.setTabInactive = function (elm) {
    elm.classList.remove(this.classes.active);
    this.displayContainer(this.ctx.getElementById(elm.getAttribute('data-target')), 'none');
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


const Fetch = function (url) {
    this.url = url;
    this.request = new XMLHttpRequest();
};
Fetch.prototype.send = function (method, success, error, final) {
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
    this.request.send();
};


const FavoriteButton = function (elm, url, classes) {
    this.button = elm;
    this.url = url;
    this.classes = classes;
    this.req = new Fetch(url);
};
FavoriteButton.prototype.register = function () {
    if (!this.button) {
        return;
    }

    this.button.addEventListener('click', this._click.bind(this));
};
FavoriteButton.prototype._click = function () {
    this.button.classList.add(this.classes.busy);
    this.req.send('POST', this._success.bind(this), this._error.bind(this), this._final.bind(this));
};
FavoriteButton.prototype._isActive = function () {
    return this.button.classList.contains(this.classes.active);
};
FavoriteButton.prototype._success = function (data) {
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


(function (w, d) {
    // init of tabs on page
    const tabs = new Tabs(classes.tabs);
    tabs.registerListeners(d);
    // init openers on page
    const openers = new Openers(classes.openers);
    openers.registerListeners(d);


    const favButton = new FavoriteButton(
        d.getElementById('claim_favorite_click'),
        'https://private-ecdfec-promo6.apiary-mock.com/tiplero',
        classes.favBtn,
    );
    favButton.register();
})(window, document);