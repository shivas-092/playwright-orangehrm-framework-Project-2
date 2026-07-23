import { expect, Locator, Page } from '@playwright/test';
import { ClaimComponent } from './claim.component';

export class AssignClaimComponent extends ClaimComponent {
  constructor(page: Page) {
    super(page);
  }

  async navigateToAssignClaim() {
    await this.page.goto('/web/index.php/claim/assignClaim', { waitUntil: 'domcontentloaded' });
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/assignClaim/);
    await expect(this.page.getByRole('heading', { name: 'Create Claim Request' })).toBeVisible();
  }

  async createClaimRequest(eventName: string, currency: string, remarks: string): Promise<string> {
    await this.waitForLoader();

    const employeeInput = this.getFieldContainer('Employee Name').getByPlaceholder('Type for hints...');
    const eventDropdown = this.getFieldContainer('Event').locator('.oxd-select-text');
    const currencyDropdown = this.getFieldContainer('Currency').locator('.oxd-select-text');
    const remarksInput = this.page.locator('textarea');

    await expect(employeeInput).toBeEditable();

    const selectedEmployeeName = await this.selectAvailableEmployee(employeeInput);

    await this.selectDropdown(eventDropdown, eventName);
    await this.selectDropdown(currencyDropdown, currency);
    await this.fillField(remarksInput, remarks);

    await Promise.all([
      this.page.waitForURL(/claim\/assignClaim\/id\/\d+/),
      this.page.getByRole('button', { name: 'Create' }).click()
    ]);

    await this.waitForLoader();
    await expect(this.getDisabledField('Reference Id')).toHaveValue(/\d+/);

    return selectedEmployeeName;
  }

  async getReferenceId(): Promise<string> {
    await this.waitForLoader();

    const referenceIdInput = this.getDisabledField('Reference Id');

    await expect(referenceIdInput).toBeVisible();

    const referenceId = await referenceIdInput.inputValue();

    if (!referenceId.trim()) {
      throw new Error('Claim reference ID was not generated.');
    }

    return referenceId.trim();
  }

  async clickAddExpense() {
    await this.waitForLoader();

    const expensesHeading = this.page.getByRole('heading', { name: 'Expenses' });
    const addExpenseButton = expensesHeading.locator('xpath=following::button[normalize-space()="Add"][1]');

    await expect(expensesHeading).toBeVisible();
    await expect(addExpenseButton).toBeVisible();
    await addExpenseButton.click();

    await expect(this.getExpenseDialog()).toBeVisible();
  }

  async addExpense(expenseType: string, expenseDate: string, amount: string, note: string) {
    const expenseDialog = this.getExpenseDialog();
    const expenseTypeDropdown = expenseDialog.locator('.oxd-select-text');
    const expenseDateInput = expenseDialog.getByPlaceholder('yyyy-dd-mm');
    const amountInput = expenseDialog.locator('input.oxd-input').last();
    const noteInput = expenseDialog.locator('textarea');

    await expect(expenseDialog).toBeVisible();

    await this.selectDropdown(expenseTypeDropdown, expenseType);
    await this.fillField(expenseDateInput, expenseDate);
    await this.fillField(amountInput, amount);
    await this.fillField(noteInput, note);

    await expect(expenseDateInput).toHaveValue(expenseDate);
    await expect(amountInput).toHaveValue(amount);
    await expect(noteInput).toHaveValue(note);

    await expenseDialog.getByRole('button', { name: 'Save' }).click();
    await this.verifySuccessToast();
    await this.waitForLoader();
    await expect(expenseDialog).toBeHidden();
  }

  async verifyExpenseInTable(expenseType: string, amount: string) {
    const expenseRow = this.page.locator('.oxd-table-card').filter({ hasText: expenseType }).first();

    await expect(expenseRow).toBeVisible();
    await expect(expenseRow).toContainText(expenseType);
    await expect(expenseRow).toContainText(amount);
  }

  async submitClaim() {
    await this.waitForLoader();

    const submitButton = this.page.getByRole('button', { name: 'Submit' });

    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await this.waitForLoader();
  }

  async verifyClaimStatus(expectedStatus: string) {
    const statusInput = this.getDisabledField('Status');

    await expect(statusInput).toHaveValue(expectedStatus);
  }

  async navigateToEmployeeClaims() {
    await this.openEmployeeClaims();
    await this.waitForLoader();
  }

  async searchEmployeeClaimByReferenceId(referenceId: string) {
    await this.waitForLoader();

    const referenceIdInput = this.getFieldContainer('Reference Id').getByPlaceholder('Type for hints...');

    await this.fillField(referenceIdInput, referenceId);
    await this.clickSearch();
    await this.waitForLoader();
  }

  async verifyEmployeeClaimInTable(referenceId: string, employeeName: string, eventName: string, expectedStatus: string) {
    const claimRow = this.page.locator('.oxd-table-card').filter({ hasText: referenceId }).first();

    await expect(claimRow).toBeVisible();
    await expect(claimRow).toContainText(referenceId);
    await expect(claimRow).toContainText(employeeName);
    await expect(claimRow).toContainText(eventName);
    await expect(claimRow).toContainText(expectedStatus);
  }

  private async selectAvailableEmployee(input: Locator): Promise<string> {
    const searchValues = ['an', 'ma', 'ra', 'jo', 'sa'];

    for (const searchValue of searchValues) {
      await expect(input).toBeEditable();
      await input.fill(searchValue);

      const dropdown = this.page.locator('.oxd-autocomplete-dropdown:visible');
      const validOption = dropdown.getByRole('option').filter({ hasNotText: /Searching|No Records Found/ }).first();

      try {
        await expect(validOption).toBeVisible({ timeout: 5000 });

        const selectedEmployeeName = (await validOption.textContent())?.trim();

        if (selectedEmployeeName) {
          await validOption.click();
          await expect(input).toHaveValue(selectedEmployeeName);

          return selectedEmployeeName;
        }
      } catch {
        await input.fill('');
      }
    }

    throw new Error('No available employee was found in the OrangeHRM demo.');
  }

  private getFieldContainer(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ hasText: label }).first();
  }

  private getDisabledField(label: string): Locator {
    return this.getFieldContainer(label).locator('input:disabled');
  }

  private getExpenseDialog(): Locator {
    return this.page.getByRole('dialog').filter({ hasText: 'Add Expense' });
  }
}