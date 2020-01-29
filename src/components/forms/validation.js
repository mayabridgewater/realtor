export default (name, value, validation) => {
    const errors = [];

    if (validation.required && !value) {
        errors.push([`${name} is required`])
    }
    if (validation.minLength && value.length < validation.minLength) {
        errors.push([`${name} must be no less than ${validation.minLength} characters`])
    }
    if (validation.maxLength && value.length > validation.maxLength) {
        errors.push([`${name} must be no more than ${validation.maxLength} characters`])
    }
    if (validation.pattern && !validation.pattern.test(value)) {
        errors.push(`${name} is invalid`)
    }
    return errors
}