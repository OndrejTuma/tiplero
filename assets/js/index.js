(function(w, d) {
    const classes = {
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


    // init of tabs on page
    const tabs = new Tabs(classes.tabs);
    tabs.registerListeners(d);

})(window, document);