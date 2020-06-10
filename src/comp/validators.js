export class Validator {
    __validators = [];
    valid = true;
    errors = {};
    value = undefined;
    active = false;
    touch = false;
    hover = false;

    validate(value) {
        this.value = value;
        this.errors = {};
        this.__validators.forEach(validator => {
            this.errors = {...this.errors, ...validator.isValid(value)};
        });
        this.valid = Object.getOwnPropertyNames(this.errors).length === 0;
    }

    setValidators(validators) {
        this.__validators = validators ? validators : [];
    }
}

export class BaseValidator {
    static isValid(value) {
        throw Error('isValid method not implement');
    }
}

export class NumberValidator extends BaseValidator{
    static isValid(value) {
        //isNaN return false when it's number
        return value && isNaN(value) ? {number: true} : {};
    }
}

export class StringValidator extends BaseValidator{
    static isValid(value) {
        const letters = /^[A-Za-z]+$/;
        return value && !value.match(letters) ? {string: true} : {};
    }
}

export class EmailValidator extends BaseValidator {
    static isValid(value) {
        let re;
        /* eslint-disable-next-line */
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(value).toLowerCase()) ? {email: true} : {};
    }
}

export class EmptyValidator extends BaseValidator {
    static isValid(value) {
        return !value ? {empty: true} : {};
    }
}