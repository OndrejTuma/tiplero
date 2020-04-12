/*
 * =========== FORMS PROTOTYPE ===========
 */

import bankAccount from './validations/bankAccount';
import email from './validations/email';
import minLength from './validations/minLength';
import required from './validations/required';

const Forms = function (classes) {
    this.classes = classes;

    this.validations = {
        bankAccount,
        email,
        minLength,
        required,
    };
    this.validationForms = [];
    this.validationElements = [];
};

Forms.prototype.listen = function (ctx) {
    ctx.querySelectorAll(`.${this.classes.form}`).forEach(form => {
        this.registerForm(form);
    });
}
Forms.prototype.registerForm = function(form) {
    const formIndex = this.validationForms.length;

    this.validationForms.push(form);

    form.addEventListener('submit', e => this._validateAll(e, formIndex));

    form.querySelectorAll(`.${this.classes.wrapper}`).forEach(wrapper => {
        const type = wrapper.dataset.validation;
        const params = wrapper.dataset.validationParams && JSON.parse(wrapper.dataset.validationParams);

        if (this.validations.hasOwnProperty(type) && typeof this.validations[type] === 'function') {
            this.validationElements.push({
                formIndex,
                wrapper,
                type,
                params,
            })
            this.registerElement(wrapper, type, params);
        }
    });
}
Forms.prototype.registerElement = function (wrapper, type, params) {
    wrapper.querySelector('input').addEventListener('blur', () => this._validate(wrapper, type, params));
}
Forms.prototype._validateAll = function (e, formIndex) {
    let error = false;

    this.validationElements.filter(({formIndex: index}) => index === formIndex).forEach(({wrapper, type, params}) => {
        if (!this._validate(wrapper, type, params)) {
            error = true;
        }
    });

    if (error) {
        e.preventDefault();
    }
}
Forms.prototype._validate = function (wrapper, type, params) {
    const input = wrapper.querySelector('input');
    const errorMessage = wrapper.querySelector(`.${this.classes.errorMessage}`);

    if (this.validations[type](input.value, params)) {
        wrapper.classList.remove(this.classes.error);
        this._hideErrorMessage(errorMessage);

        return true;
    } else {
        wrapper.classList.add(this.classes.error);
        this._showErrorMessage(errorMessage);

        return false;
    }
}
Forms.prototype._hideErrorMessage = function (errorMessage) {
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}
Forms.prototype._showErrorMessage = function (errorMessage) {
    if (errorMessage) {
        errorMessage.style.display = 'block';
    }
}

export default Forms;