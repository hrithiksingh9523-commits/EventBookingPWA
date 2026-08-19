export const loginRequiredCases = [
    {
        scenario: 'both fields blank',
        email: '',
        password: ''
    },
    {
        scenario: 'blank email',
        email: '',
        password: 'ValidPass1!'
    },
    {
        scenario: 'blank password',
        email: 'user@test.com',
        password: ''
    }
];

export const invalidEmailCases = [
    {
        scenario: 'email without @',
        email: 'testgmail.com',
        password: 'ValidPass1!',
        validationField: 'email'
    },
    {
        scenario: 'email missing domain',
        email: 'test@',
        password: 'ValidPass1!',
        validationField: 'email'
    },
    {
        scenario: 'email missing username',
        email: '@gmail.com',
        password: 'ValidPass1!',
        validationField: 'email'
    }
];

export const invalidCredentialsCases = [
    {
        scenario: 'wrong password',
        email: 'test@example.com',
        password: 'WrongPass1!'
    },
    {
        scenario: 'non-existent user',
        email: 'missing-user-123456@test.com',
        password: 'WrongPass1!'
    }
];

export const edgeCases = [
    {
        scenario: 'email with leading and trailing spaces',
        email: { leading: ' ', trailing: ' ' },
        password: { leading: '', trailing: '' },
        expected: 'success'
    },
    {
        scenario: 'password with leading and trailing spaces',
        email: { leading: '', trailing: '' },
        password: { leading: ' ', trailing: ' ' },
        expected: 'authError'
    },
    {
        scenario: 'click signIn twice',
        email: { leading: '', trailing: '' },
        password: { leading: '', trailing: '' },
        expected: 'success'
    }
];
