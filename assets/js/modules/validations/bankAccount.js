export default function(email) {
    const regularExpression = new RegExp(/^(\d{1,4}-)?\d{10}\/\d{4}$/);

    return regularExpression.test(email);
};