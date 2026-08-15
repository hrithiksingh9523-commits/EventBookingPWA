export const invalidEmailCases = [
    {
        scenario: 'email without @',
        email: 'testgmail.com',
        expectedKey: 'invalidEmail'
    },
    {
        scenario: 'email without domain',
        email: 'test@',
        expectedKey: 'invalidEmail'
    },
    {
        scenario: 'email without username',
        email: '@gmail.com',
        expectedKey: 'invalidEmail'
    }
];

export const invalidPasswordCases = [
    {
        scenario: 'password less than 8 characters',
        password: 'Tes@12',
        expectedKey: 'passwordMinLength'
    },
    {
        scenario: 'password without uppercase',
        password: 'testing@123',
        expectedKey: 'passwordUppercase'
    },
    {
        scenario: 'password without number',
        password: 'Testing@abc',
        expectedKey: 'passwordNumber'
    },
    {
        scenario: 'password without special character',
        password: 'Testing123',
        expectedKey: 'passwordSpecialChar'
    }
];

export const requiredFieldCases = [
    {
        scenario: 'all fields blank',
        email: '',
        password: '',
        confirmPassword: '',
        expectedKey: 'invalidEmail'
    },
    {
        scenario: 'email blank',
        email: '',
        password: 'Testing@123',
        confirmPassword: 'Testing@123',
        expectedKey: 'invalidEmail'
    },
    {
        scenario: 'password blank',
        email: 'user@test.com',
        password: '',
        confirmPassword: '',
        expectedKey: 'passwordMinLength'
    },
    {
        scenario: 'confirm password blank',
        email: 'user2@test.com',
        password: 'Testing@123',
        confirmPassword: '',
        expectedKey: 'passwordMismatch'
    }
];

export const confirmMismatchCases = [
    {
        scenario: 'password and confirm password mismatch',
        email: 'mismatch@test.com',
        password: 'Testing@123',
        confirmPassword: 'Testing@124',
        expectedKey: 'passwordMismatch'
    }
];

export const whitespaceAndEdgeCases = [
    {
        scenario: 'inputs with only whitespace',
        email: '   ',
        password: '        ',
        confirmPassword: '        ',
        expectedKey: 'invalidEmail'
    },
    {
        scenario: 'very long email and password',
        email: 'user_' + 'a'.repeat(200) + '@test.com',
        password: 'A1!'+ 'a'.repeat(250),
        confirmPassword: 'A1!'+ 'a'.repeat(250),
        expectedKey: 'passwordUppercase'
    }
];

export const duplicateEmailCase = {
    scenario: 'email already registered',
    email: 'hrithik123@gmail.com',
    password: 'Testing@123',
    confirmPassword: 'Testing@123',
    expectedKey: 'duplicateEmail'
};