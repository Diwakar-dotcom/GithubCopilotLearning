import { test, expect } from '../fixtures/test.fixtures';

test.describe('Dashboard functionality', () => {
  test.beforeEach(async ({ authenticatedPage, dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('should display dashboard with user info', async ({ dashboardPage }) => {
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.userAvatar).toBeVisible();
    await expect(dashboardPage.statsCards).toHaveCount(4);
  });

  test('should navigate to profile page', async ({ dashboardPage, page }) => {
    await dashboardPage.userAvatar.click();
    await dashboardPage.profileLink.click();
    await expect(page).toHaveURL('/profile');
  });

  test('should navigate to settings page', async ({ dashboardPage, page }) => {
    await dashboardPage.userAvatar.click();
    await dashboardPage.settingsLink.click();
    await expect(page).toHaveURL('/settings');
  });

  test('should logout successfully', async ({ dashboardPage, page }) => {
    await dashboardPage.userAvatar.click();
    await dashboardPage.logoutLink.click();
    await expect(page).toHaveURL('/login');
  });

  test('should display recent activity', async ({ dashboardPage }) => {
    await expect(dashboardPage.recentActivityList).toBeVisible();
    await expect(dashboardPage.recentActivityItems.first()).toBeVisible();
  });

  test('should navigate to checkout from dashboard', async ({ dashboardPage, page }) => {
    await dashboardPage.checkoutButton.click();
    await expect(page).toHaveURL('/checkout');
  });
});

test.describe('Dashboard - Admin features', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('should show admin panel link for admin users', async ({ dashboardPage }) => {
    await expect(dashboardPage.adminPanelLink).toBeVisible();
  });

  test('should navigate to admin panel', async ({ dashboardPage, page }) => {
    await dashboardPage.adminPanelLink.click();
    await expect(page).toHaveURL('/admin');
  });
});