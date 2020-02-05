(function(w, d) {
    const classes = {
        tabs: {
            active: 'tabs__tab--active',
            tab: 'tabs__tab',
        }
    };
    const selectors = {
        tabs: '.tabs',
        tab: '.tabs__tab',
    };

    function setTabActive(elm) {
        elm.classList.add(classes.tabs.active);
        displayContainer(d.getElementById(elm.getAttribute('data-target')), 'block');
    }
    function setTabInactive(elm) {
        elm.classList.remove(classes.tabs.active);
        displayContainer(d.getElementById(elm.getAttribute('data-target')), 'none');
    }
    function displayContainer(elm, display) {
        if (elm) {
            elm.style.display = display;
        }
    }

    d.querySelectorAll(selectors.tabs).forEach(tabs => {
        tabs.addEventListener('click', e => {

            if (e.target.classList.contains(classes.tabs.tab)) {
                tabs.querySelectorAll(selectors.tab).forEach(elm => setTabInactive(elm));

                setTabActive(e.target);
            }
        });
    });

})(window, document);