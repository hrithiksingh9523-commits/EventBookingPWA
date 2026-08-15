export function generateEmail() {
    const timestamp = Date.now();
    return `automation_${Date.now()}_${Math.floor(Math.random() * 10000)}@test.com`;
}



export function generatePassword(length) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";

    let password = "";

    // Guarantee each required condition
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    const allChars = uppercase + lowercase + numbers + specialChars;

    // Fill remaining characters
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle so required characters aren't always at the beginning
    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    return password;
}

export function generateUser(passwordLength = 10) {
    const password = generatePassword(passwordLength);
    return {
        email: generateEmail(),
        password: password,
        confirmPassword: password
    };
}