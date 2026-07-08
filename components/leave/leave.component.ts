import { Page, expect } from '@playwright/test';

export class LeaveComponent {
  constructor(private readonly page: Page) {}

  async navigateToAddEntitlement() {
    await this.page.goto('/web/index.php/leave/addLeaveEntitlement', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.page.getByText('Add Leave Entitlement')).toBeVisible();
  }

  async addLeaveEntitlement(employeeName: string) {
    await this.selectEmployeeFromAutocomplete(employeeName);
    await this.selectDropdownOptionByIndex(0, 'CAN - Personal');

    await this.entitlementInput().fill('6');

    await this.page.getByRole('button', { name: 'Save' }).click();

    const confirmButton = this.page.getByRole('button', { name: 'Confirm' });

    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    await expect(this.page.getByText('Successfully Saved')).toBeVisible();
  }

  async navigateToApplyLeave() {
    await this.page.goto('/web/index.php/leave/applyLeave', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.page.getByText('Apply Leave')).toBeVisible();
  }

  async applyOneDayLeave(comment: string) {
    await this.selectDropdownOptionByIndex(0, 'CAN - Personal');

    await this.enterDateByIndex(0, '2026-14-07');
    await this.enterDateByIndex(1, '2026-14-07');

    await this.page.keyboard.press('Escape');

    await this.commentsTextarea().fill(comment);

    const applyButton = this.page.getByRole('button', { name: 'Apply' });

    await expect(applyButton).toBeVisible();
    await applyButton.click();

    await expect(this.page.getByText('Successfully Saved')).toBeVisible();
  }

  async navigateToMyLeave() {
    await this.page.goto('/web/index.php/leave/viewMyLeaveList', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.page.getByText('My Leave List')).toBeVisible();
  }

  async searchMyLeave() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyAppliedLeaveExists() {
    await expect(this.page.locator('.oxd-table-body')).toContainText(
      'CAN - Personal'
    );
  }

  async cancelAppliedLeave() {
    const leaveRow = this.page
      .locator('.oxd-table-card')
      .filter({ hasText: 'CAN - Personal' })
      .first();

    await expect(leaveRow).toBeVisible();

    await leaveRow.getByRole('button', { name: 'Cancel' }).click();

    await expect(this.page.getByText('Successfully Updated')).toBeVisible();
  }

  async verifyLeaveCancelled() {
    await expect(this.page.locator('.oxd-table-body')).toContainText(
      'Cancelled'
    );
  }

  private async enterDateByIndex(index: number, date: string) {
    const dateInput = this.page.getByPlaceholder('yyyy-dd-mm').nth(index);

    await dateInput.click();
    await dateInput.press('Control+A');
    await dateInput.press('Backspace');
    await dateInput.type(date);
    await dateInput.press('Tab');
  }

  private async selectEmployeeFromAutocomplete(employeeName: string) {
    const employeeInput = this.employeeNameInput();
    const firstName = employeeName.split(' ')[0];

    await employeeInput.clear();
    await employeeInput.fill(firstName);

    const option = this.page
      .locator('.oxd-autocomplete-dropdown')
      .getByText(employeeName, { exact: true });

    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();

    await expect(this.page.getByText('Invalid')).toHaveCount(0);
  }

  private async selectDropdownOptionByIndex(
    dropdownIndex: number,
    option: string
  ) {
    await this.page.locator('.oxd-select-text').nth(dropdownIndex).click();
    await this.page.getByRole('option', { name: option }).click();
  }

  private employeeNameInput() {
    return this.page.getByRole('textbox', { name: 'Type for hints...' });
  }

  private entitlementInput() {
    return this.page.locator(
      '//label[text()="Entitlement"]/../following-sibling::div//input'
    );
  }

  private commentsTextarea() {
    return this.page.locator('textarea').first();
  }
}