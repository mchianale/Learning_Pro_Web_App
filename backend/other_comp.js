"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidString = exports.NotNull = exports.isValidName = exports.isValidPassword = void 0;
function isValidPassword(password) {
    // Check if the length is greater than or equal to 6
    if (password.length < 6) {
        return false;
    }
    // Check if there is at least one number
    if (!/\d/.test(password)) {
        return false;
    }
    // Check if there is at least one special character (you can customize the character set)
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (!specialCharacterRegex.test(password)) {
        return false;
    }
    // All checks passed, the password is valid
    return true;
}
exports.isValidPassword = isValidPassword;
function isValidName(name) {
    // Check if the name contains only alphabetic characters and spaces
    const validNameRegex = /^[a-zA-Z\s]+$/;
    return validNameRegex.test(name);
}
exports.isValidName = isValidName;
function NotNull(input) {
    return input !== null && input != undefined;
}
exports.NotNull = NotNull;
function isValidString(input) {
    if (!NotNull(input)) {
        return false;
    }
    // Check if the string is not empty and not made of spaces only
    if (input.trim() === '') {
        return false;
    }
    // Check if the string contains at least one non-numeric character
    if (/^\d+$/.test(input)) {
        return false;
    }
    // Check if the string contains special characters
    if (/[^A-Za-z0-9 ]/.test(input)) {
        return false;
    }
    // All checks passed, the string is valid
    return true;
}
exports.isValidString = isValidString;
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regex
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=other_comp.js.map