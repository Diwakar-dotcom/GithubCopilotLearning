import { test, expect } from '../fixtures/test.fixtures';

test.describe('Signup functionality', () => {
  test('should display signup form', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByLabel('Full name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByLabel('Confirm password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();
  });

  test('should signup with valid details', async ({ page }) => {
    await page.goto('/signup');
    const email = `user_${Date.now()}@example.com`;
    await page.getByLabel('Full name').fill('New User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('NewUserPass123!');
    await page.getByLabel('Confirm password').fill('NewUserPass123!');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('New User')).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel('Full name').fill('Another User');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('UserPass123!');
    await page.getByLabel('Confirm password').fill('UserPass123!');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('already exists');
  });

  test('should show error for password mismatch', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel('Full name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm password').fill('DifferentPass123!');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should show error for weak password', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel('Full name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByLabel('Confirm password').fill('123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');
  });
});
