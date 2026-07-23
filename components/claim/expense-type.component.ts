import { expect, Page } from '@playwright/test';
import { ClaimComponent } from './claim.component';

export class ExpenseTypeComponent extends ClaimComponent {
  constructor(page: Page) {
    super(page);
  }

  async navigateToExpenseTypes() {
    await this.navigateToClaim();
    await this.openExpenseTypes();
  }

  async clickAddExpenseType() {
    await this.clickAdd();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/saveExpense/);
    await expect(this.page.getByRole('heading', { name: 'Add Expense Type' })).toBeVisible();
  }

  async createExpenseType(expenseTypeName: string, description: string) {
    await this.waitForLoader();

    const expenseForm = this.page.locator('.orangehrm-card-container');
    const expenseNameInput = expenseForm.locator('input.oxd-input').first();
    const descriptionInput = expenseForm.locator('textarea');

    await this.fillField(expenseNameInput, expenseTypeName);
    await this.fillField(descriptionInput, description);
    await expect(expenseNameInput).toHaveValue(expenseTypeName);
    await this.clickSave();
    await this.verifySuccessToast();
  }
}