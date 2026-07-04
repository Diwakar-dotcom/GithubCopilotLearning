import { test, expect } from '../fixtures/test.fixtures';

test.describe('Login functionality', () => {
  test('should login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login('user@example.com', 'UserPass123!');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('user@example.com', 'wrongpassword');
    await loginPage.expectErrorMessage('Invalid email or password');
  });

  test('should show error for non-existent user', async ({ loginPage }) => {
    await loginPage.login('nonexistent@example.com', 'password');
    await loginPage.expectErrorMessage('Invalid email or password');
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('/forgot-password');
  });

  test('should navigate to signup page', async ({ loginPage, page }) => {
    await loginPage.signupLink.click();
    await expect(page).toHaveURL('/signup');
  });
});

test.describe('Login - Edge cases', () => {
  test('should show validation error for empty email', async ({ loginPage }) => {
    await loginPage.emailInput.fill('');
    await loginPage.passwordInput.fill('password');
    await loginPage.submitButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('required');
  });

  test('should show validation error for empty password', async ({ loginPage }) => {
    await loginPage.emailInput.fill('user@example.com');
    await loginPage.passwordInput.fill('');
    await loginPage.submitButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('required');
  });

  test('should show validation error for invalid email format', async ({ loginPage }) => {
    await loginPage.emailInput.fill('invalid-email');
    await loginPage.passwordInput.fill('password');
    await loginPage.submitButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
  });
});