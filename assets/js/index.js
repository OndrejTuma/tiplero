const classes = {
    header: {
        active: 'header--menu-open',
    },
    tabs: {
        active: 'tabs__tab--active',
        tab: 'tabs__tab',
        tabs: 'tabs',
    }
};

const Tabs = function(classes) {
    this.classes = classes;
};
Tabs.prototype.registerListeners = function (ctx) {
    ctx.querySelectorAll(`.${this.classes.tabs}`).forEach(tabs => {
        tabs.addEventListener('click', e => {
            if (e.target.classList.contains(this.classes.tab)) {
                tabs.querySelectorAll(`.${this.classes.tab}`).forEach(elm => this.setTabInactive(elm));

                this.setTabActive(e.target);
            }
        });
    });
};
Tabs.prototype.setTabActive = function (elm) {
    elm.classList.add(this.classes.active);
    this.displayContainer(d.getElementById(elm.getAttribute('data-target')), 'block');
};
Tabs.prototype.setTabInactive = function (elm) {
    elm.classList.remove(this.classes.active);
    this.displayContainer(d.getElementById(elm.getAttribute('data-target')), 'none');
};
Tabs.prototype.displayContainer = function (elm, display) {
    if (elm) {
        elm.style.display = display;
    }
};


const Header = function (header, classes) {
    this.classes = classes;
    this.headerElm = header;
    this.isOpen = false;
};
Header.prototype._click = function(e) {
    e.preventDefault();

    this.isOpen ? this._closeMenu() : this._openMenu();
};
Header.prototype._openMenu = function() {
    this.isOpen = true;
    this.headerElm.classList.add(this.classes.active);
};
Header.prototype._closeMenu = function() {
    this.isOpen = false;
    this.headerElm.classList.remove(this.classes.active);
};
Header.prototype.registerListener = function (hamburger) {
    hamburger.addEventListener('click', this._click.bind(this));
};


(function(w, d) {
    // init of tabs on page
    const tabs = new Tabs(classes.tabs);
    tabs.registerListeners(d);

    const header = new Header(d.getElementById('header'), classes.header);
    header.registerListener(d.getElementById('hamburger'));
})(window, document);