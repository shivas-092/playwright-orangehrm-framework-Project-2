import { Page, expect, Locator } from '@playwright/test';

export class LeaveComponent {
  constructor(private readonly page: Page) {}

  async navigateToAddEntitlement() {
    await this.page.goto('/web/index.php/leave/addLeaveEntitlement', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/addLeaveEntitlement/);
    await this.waitForFormLoader();
    await expect(this.page.getByText('Add Leave Entitlement', { exact: true })).toBeVisible();
  }

  async addLeaveEntitlement(employeeName: string) {
    await this.waitForFormLoader();
    await this.selectEmployeeFromAutocomplete(employeeName);
    await this.selectDropdownOptionByIndex(0, 'CAN - Personal');
    await this.entitlementInput().fill('6');
    await this.page.getByRole('button', { name: 'Save' }).click();

    const confirmButton = this.page.getByRole('button', { name: 'Confirm' });

    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
    await expect(this.page.getByText('Successfully Saved', { exact: false })).toBeVisible();
    await this.waitForFormLoader();
  }

  async navigateToApplyLeave() {
    await this.page.goto('/web/index.php/leave/applyLeave', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/applyLeave/);
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();
    await expect(this.page.getByPlaceholder('dd-mm-yyyy').first()).toBeVisible();
  }

  async applyOneDayLeave(comment: string) {
    await this.waitForFormLoader();
    await this.selectDropdownOptionByIndex(0, 'CAN - Personal');
    await this.enterDateByIndex(0, '14-07-2026');
    await this.enterDateByIndex(1, '14-07-2026');
    await this.page.keyboard.press('Escape');
    await this.commentsTextarea().fill(comment);

    const applyButton = this.page.getByRole('button', { name: 'Apply' });

    await expect(applyButton).toBeVisible();
    await expect(applyButton).toBeEnabled();
    await applyButton.click();
    await expect(this.page.getByText('Successfully Saved', { exact: false })).toBeVisible();
    await this.waitForFormLoader();
  }

  async navigateToMyLeave() {
    await this.page.goto('/web/index.php/leave/viewMyLeaveList', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/viewMyLeaveList/);
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'My Leave List' })).toBeVisible();
  }

  async searchMyLeave() {
    await this.waitForFormLoader();
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForFormLoader();
  }

  async verifyAppliedLeaveExists() {
    await expect(this.page.locator('.oxd-table-body')).toContainText('CAN - Personal');
  }

  async cancelAppliedLeave() {
    const leaveRow = this.page.locator('.oxd-table-card').filter({ hasText: 'CAN - Personal' }).first();

    await expect(leaveRow).toBeVisible();
    await leaveRow.getByRole('button', { name: 'Cancel' }).click();
    await expect(this.page.getByText('Successfully Updated', { exact: false })).toBeVisible();
    await this.waitForFormLoader();
  }

  async verifyLeaveCancelled() {
    await expect(this.page.locator('.oxd-table-body')).toContainText('Cancelled');
  }

  private async enterDateByIndex(index: number, date: string) {
    const dateInput = this.page.getByPlaceholder('dd-mm-yyyy').nth(index);

    await expect(dateInput).toBeVisible();
    await dateInput.click();
    await dateInput.fill(date);
    await dateInput.press('Tab');
  }

  private async selectEmployeeFromAutocomplete(employeeName: string) {
    const employeeInput = this.employeeNameInput();
    const firstName = employeeName.split(' ')[0];

    await employeeInput.clear();
    await employeeInput.fill(firstName);

    const option = this.page.locator('.oxd-autocomplete-dropdown').getByText(employeeName, { exact: true });

    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
    await expect(this.page.getByText('Invalid', { exact: true })).toHaveCount(0);
  }

  private async selectDropdownOptionByIndex(dropdownIndex: number, option: string) {
    await this.waitForFormLoader();
    await this.page.locator('.oxd-select-text').nth(dropdownIndex).click();
    await this.page.getByRole('option', { name: option, exact: true }).click();
  }

  private async waitForFormLoader() {
    const loader = this.page.locator('.oxd-form-loader');

    if (await loader.count()) {
      await loader.waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    }
  }

  private employeeNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Type for hints...' });
  }

  private entitlementInput(): Locator {
    return this.page.locator('//label[text()="Entitlement"]/../following-sibling::div//input');
  }

  private commentsTextarea(): Locator {
    return this.page.locator('textarea').first();
  }
}