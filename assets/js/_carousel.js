/*
 * =========== CAROUSEL PROTOTYPE ===========
 */

const Carousel = function (container, navigation, classes) {
    this.activeSlide = 0;
    this.classes = classes;
    this.container = container;
    this.interval = null;
    this.navigation = navigation;
    this.navigationItems = null;
    this.options = {
        autoplay: true,
        activeSlide: 0,
        timeout: 5000,
    };
    this.slides = null;
};
Carousel.prototype.run = function (options) {
    if (!this.container) {
        return;
    }

    Object.assign(this.options, options);
    this.slides = this.container.querySelectorAll(`.${this.classes.slide}`);
    this.slidesLength = this.slides.length;

    this._setActiveSlide(this.options.activeSlide);
    this._connectNavigation();

    this._paint();

    if (this.options.autoplay) {
        this.interval = setInterval(this._slide.bind(this), this.options.timeout);
    }
};
Carousel.prototype.stop = function () {
    clearInterval(this.interval);
};
Carousel.prototype._connectNavigation = function () {
    if (!this.navigation) {
        return;
    }

    this.navigationItems = this.navigation.querySelectorAll(`.${this.classes.navigationItem}`);

    if (!this.navigationItems.length) {
        return;
    }

    this.navigationItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            this._slideTo(i);
        });
    });
};
Carousel.prototype._getActiveSlide = function () {
    return this.slides.hasOwnProperty(this.activeSlide) ? this.slides[this.activeSlide] : this.slides[0];
};
Carousel.prototype._paint = function () {
    this.slides.forEach(slide => {
        slide.classList.remove(this.classes.active);
    });
    this._getActiveSlide().classList.add(this.classes.active);

    if (this.navigationItems) {
        this.navigationItems.forEach(item => {
            item.classList.remove(this.classes.navigationItemActive);
        });
        this.navigationItems[this.activeSlide].classList.add(this.classes.navigationItemActive);
    }
};
Carousel.prototype._setActiveSlide = function (slide) {
    this.activeSlide = slide;
};
Carousel.prototype._slide = function () {
    this._slideTo(this.activeSlide >= this.slidesLength - 1 ? 0 : this.activeSlide + 1);
};
Carousel.prototype._slideTo = function (i) {
    this._setActiveSlide(i);
    this._paint();
};