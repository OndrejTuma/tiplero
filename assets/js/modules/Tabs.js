/*
 * =========== TABS PROTOTYPE ===========
 */

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

export default Tabs;