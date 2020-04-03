/*
 * =========== RATING CONTROLLER PROTOTYPE ===========
 */

const Rating = function (classes, stars) {
    this.classes = classes;
    this.stars = stars;
};
Rating.prototype.connect = function (ctx) {
    ctx.querySelectorAll(`.${this.classes.rating}`).forEach((rating, i) => {
        this._connectRating(rating, i);
    });
};
Rating.prototype._connectRating = function (rating, index) {
    const percents = parseInt(rating.dataset.rating);
    const percentsArray = this._getStarsPercentsArray(percents, this.stars);
    const svgMaxWidth = 12;

    rating.querySelectorAll('svg').forEach((star, i) => {
        const maskElm = star.querySelector('mask');
        const maskPathElm = maskElm.querySelector('path');
        const pathWithMaskElm = star.querySelector('path[mask]');
        const id = `rating_${index}_mask_${i}`;

        maskElm.setAttribute('id', id);
        pathWithMaskElm.setAttribute('mask', `url(#${id})`);
        maskPathElm.setAttribute(
            'd',
            maskPathElm.getAttribute('d').replace(/h[0-9]+/, `h${Math.round(percentsArray[i] / 100 * svgMaxWidth)}`)
        );
    });
};
Rating.prototype._getStarsPercentsArray = function (percents) {
    const fullStars = Math.floor(percents / 100 * this.stars);

    return new Array(this.stars).fill(0).map((__, i) => {
        if (i < fullStars) {
            return 100;
        }
        if (i === fullStars) {
            return Math.round(percents - 100 / this.stars * fullStars) / (100 / this.stars) * 100;
        }

        return 0;
    });
};

export default Rating;