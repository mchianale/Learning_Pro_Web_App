export function isValidPassword(password: string): boolean {
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

export function isValidName(name: string): boolean {
    // Check if the name contains only alphabetic characters and spaces
    const validNameRegex = /^[a-zA-Z\s]+$/;
    return validNameRegex.test(name);
}

export function NotNull(input : string): boolean {
    return input !== null && input != undefined
}
export function isValidString(input: string): boolean {
    if (!NotNull(input)) {
        return false
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

export function isValidEmail(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    return emailRegex.test(email);
}
