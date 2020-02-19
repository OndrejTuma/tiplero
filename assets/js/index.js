const FAVORITE_ENDPOINT_URL = 'https://private-ecdfec-promo6.apiary-mock.com/tiplero';
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
    rating: {
        rating: 'rating',
        stars: 'stars',
    },
    tabs: {
        active: 'tabs__tab--active',
        targetActive: 'tabs__target--active',
        tab: 'tabs__tab',
        tabs: 'tabs',
    },
};



/*
 * =========== INITIALIZATION ===========
 */

(function (w, d) {
    // init of tabs on page
    const tabs = new Tabs(classes.tabs);
    tabs.registerListeners(d);
    // init openers on page
    const openers = new Openers(classes.openers);
    openers.registerListeners(d);


    const favButton = new FavoriteButton(
        d.getElementById('claim_favorite_click'),
        FAVORITE_ENDPOINT_URL,
        classes.favBtn,
    );
    favButton.register();

    const ratings = new Rating(classes.rating, 5);
    ratings.connect(d);
})(window, document);