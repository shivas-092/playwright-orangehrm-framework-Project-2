import { expect, Locator, Page } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export class ClaimComponent {
  constructor(protected readonly page: Page) {}

  async navigateToClaim() {
    await this.page.goto('/web/index.php/claim/viewAssignClaim', { waitUntil: 'domcontentloaded' });
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/viewAssignClaim/);
    await expect(this.page.getByRole('heading', { name: 'Employee Claims' })).toBeVisible();
  }

  async openConfigurationMenu() {
    await this.waitForLoader();
    const configurationTab = this.page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Configuration' }).first();
    await expect(configurationTab).toBeVisible();
    await configurationTab.click();
    await expect(this.page.getByRole('menuitem', { name: 'Events' })).toBeVisible();
    await expect(this.page.getByRole('menuitem', { name: 'Expense Types' })).toBeVisible();
  }

  async openEvents() {
    await this.openConfigurationMenu();
    await this.page.getByRole('menuitem', { name: 'Events' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/viewEvents/);
    await expect(this.page.getByRole('heading', { name: 'Events' })).toBeVisible();
  }

  async openExpenseTypes() {
    await this.openConfigurationMenu();
    await this.page.getByRole('menuitem', { name: 'Expense Types' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/viewExpense/);
    await expect(this.page.getByRole('heading', { name: 'Expense Types' })).toBeVisible();
  }

  async openAssignClaim() {
    await this.waitForLoader();
    await this.page.getByRole('link', { name: 'Assign Claim' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/assignClaim/);
    await expect(this.page.getByRole('heading', { name: 'Create Claim Request' })).toBeVisible();
  }

  async openSubmitClaim() {
    await this.waitForLoader();
    await this.page.getByRole('link', { name: 'Submit Claim' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/submitClaim/);
    await expect(this.page.getByRole('heading', { name: 'Create Claim Request' })).toBeVisible();
  }

  async openMyClaims() {
    await this.waitForLoader();
    await this.page.getByRole('link', { name: 'My Claims' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/viewClaim/);
    await expect(this.page.getByRole('heading', { name: 'My Claims' })).toBeVisible();
  }

  async openEmployeeClaims() {
    await this.waitForLoader();
    await this.page.getByRole('link', { name: 'Employee Claims' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/viewAssignClaim/);
    await expect(this.page.getByRole('heading', { name: 'Employee Claims' })).toBeVisible();
  }

  protected async waitForLoader() {
    await FormUtil.waitForLoader(this.page);
  }

  protected async verifySuccessToast() {
    await FormUtil.verifySavedToast(this.page);
  }

  protected async clickSave() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  protected async clickSearch() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  protected async clickReset() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }

  protected async clickAdd() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: /Add/ }).first().click();
  }

  protected async fillField(input: Locator, value: string) {
    await FormUtil.fill(input, value);
  }

  protected async selectDropdown(dropdown: Locator, option: string) {
    await FormUtil.selectDropdownByText(this.page, dropdown, option);
  }

  protected async enableToggle(toggle: Locator) {
    await expect(toggle).toBeVisible();
    const checkbox = toggle.locator('input[type="checkbox"]');
    if (await checkbox.count()) {
      if (!(await checkbox.isChecked())) await toggle.click();
      return;
    }
    const className = await toggle.getAttribute('class');
    if (!className?.includes('oxd-switch-input--active')) await toggle.click();
  }
}