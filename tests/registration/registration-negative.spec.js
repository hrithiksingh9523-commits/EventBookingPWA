import { expect } from '@playwright/test';
import { customTest } from '../../fixtures/testFixtures.js';
import { invalidEmailCases, invalidPasswordCases, requiredFieldCases, confirmMismatchCases, whitespaceAndEdgeCases, duplicateEmailCase } from '../../test-data/registrationData.js';
import { registrationMessages } from '../../constants/messages.js';

customTest.describe('Registration Page - Negative', () => {
	for (const tc of invalidEmailCases) {
		customTest(`shows validation for ${tc.scenario}`, async ({ registerationPage }) => {
			await registerationPage.navigate();
			await registerationPage.fillRegistrationForm(tc.email, 'Testing@123', 'Testing@123');
			await registerationPage.createAccount();

			const expected = registrationMessages[tc.expectedKey];
			await expect(registerationPage.page.getByText(expected)).toBeVisible();
		});
	}

	for (const tc of invalidPasswordCases) {
		customTest(`shows validation for ${tc.scenario}`, async ({ registerationPage }) => {
			await registerationPage.navigate();
			// use a valid email but invalid password from the case
			await registerationPage.fillRegistrationForm('automation_negative@test.com', tc.password, tc.password);
			await registerationPage.createAccount();

			const expected = registrationMessages[tc.expectedKey];
			await expect(registerationPage.page.getByText(expected)).toBeVisible();
		});
	}

	for (const tc of requiredFieldCases) {
		customTest(`shows validation for ${tc.scenario}`, async ({ registerationPage }) => {
			await registerationPage.navigate();
			await registerationPage.fillRegistrationForm(tc.email ?? '', tc.password ?? '', tc.confirmPassword ?? '');
			await registerationPage.createAccount();

			const expected = registrationMessages[tc.expectedKey];
			await expect(registerationPage.page.getByText(expected)).toBeVisible();
		});
	}

	for (const tc of confirmMismatchCases) {
		customTest(`shows validation for ${tc.scenario}`, async ({ registerationPage }) => {
			await registerationPage.navigate();
			await registerationPage.fillRegistrationForm(tc.email, tc.password, tc.confirmPassword);
			await registerationPage.createAccount();

			const expected = registrationMessages[tc.expectedKey];
			await expect(registerationPage.page.getByText(expected)).toBeVisible();
		});
	}

	for (const tc of whitespaceAndEdgeCases) {
		customTest.only(`shows validation for ${tc.scenario}`, async ({ registerationPage }) => {
			await registerationPage.navigate();
			await registerationPage.fillRegistrationForm(tc.email, tc.password, tc.confirmPassword);
			await registerationPage.createAccount();

			const expected = registrationMessages[tc.expectedKey];
			await expect(registerationPage.page.getByText(expected)).toBeVisible();
		});
	}

	customTest(`shows validation for ${duplicateEmailCase.scenario}`, async ({ registerationPage }) => {
		await registerationPage.navigate();
		await registerationPage.fillRegistrationForm(duplicateEmailCase.email, duplicateEmailCase.password, duplicateEmailCase.confirmPassword);
		await registerationPage.createAccount();

		const expected = registrationMessages[duplicateEmailCase.expectedKey];
		await expect(registerationPage.page.getByText(expected)).toBeVisible();
	});
});
