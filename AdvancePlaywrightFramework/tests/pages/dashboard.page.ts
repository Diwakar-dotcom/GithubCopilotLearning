import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly userAvatar: Locator;
  readonly profileLink: Locator;
  readonly settingsLink: Locator;
  readonly logoutLink: Locator;
  readonly navigationMenu: Locator;
  readonly statsCards: Locator;
  readonly recentActivityList: Locator;
  readonly recentActivityItems: Locator;
  readonly checkoutButton: Locator;
  readonly adminPanelLink: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.userAvatar = page.getByTestId('user-avatar');
    this.profileLink = page.getByRole('menuitem', { name: 'Profile' });
    this.settingsLink = page.getByRole('menuitem', { name: 'Settings' });
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    this.navigationMenu = page.getByRole('navigation');
    this.statsCards = page.getByTestId('stats-card');
    this.recentActivityList = page.getByTestId('recent-activity');
    this.recentActivityItems = page.getByTestId('activity-item');
    this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
    this.adminPanelLink = page.getByRole('link', { name: 'Admin Panel' });
  }

  async goto(): Promise<void> {
    await this.navigate('/dashboard');
    await this.waitForPageLoad();
  }

  async expectWelcomeMessage(username: string): Promise<void> {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.welcomeMessage).toContainText(username);
  }

  async getStatsCount(): Promise<number> {
    return await this.statsCards.count();
  }

  async clickUserMenu(): Promise<void> {
    await this.clickElement(this.userAvatar);
  }

  async logout(): Promise<void> {
    await this.clickUserMenu();
    await this.clickElement(this.logoutLink);
    await this.waitForPageLoad();
  }

  async navigateToSection(sectionName: string): Promise<void> {
    const link = this.navigationMenu.getByRole('link', { name: sectionName });
    await this.clickElement(link);
    await this.waitForPageLoad();
  }
}