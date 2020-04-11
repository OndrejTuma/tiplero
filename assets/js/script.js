import Carousel from './modules/Carousel';
import FavoriteButton from './modules/FavoriteButton';
import Forms from './modules/Forms';
import Openers from './modules/Openers';
import Rating from './modules/Rating';
import Tabs from './modules/Tabs';

const FAVORITE_ENDPOINT_URL = 'https://private-ecdfec-promo6.apiary-mock.com/tiplero';
const classes = {
    carousel: {
        active: 'slider__slide--active',
        slide: 'slider__slide',
        navigationItem: 'slider__nav__item',
        navigationItemActive: 'slider__nav__item--active',
    },
    favBtn: {
        active: 'claim__favorite--is-favorite',
        busy: 'claim__favorite--busy',
    },
    forms: {
        wrapper: 'form__element--validate',
        error: 'input--error',
        errorMessage: 'input__error',
        form: 'form--validate',
    },
    header: {
        active: 'header--menu-open',
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

    const carousel = new Carousel(d.getElementById('discount_carousel'), d.getElementById('discount_carousel_nav'), classes.carousel);
    carousel.run({
        autoplay: true,
        timeout: 5000,
    });

    const forms = new Forms(classes.forms);
    forms.listen(d);
})(window, document);