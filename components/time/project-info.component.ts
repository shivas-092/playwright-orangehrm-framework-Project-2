import { Page, expect, Locator } from '@playwright/test';

export class ProjectInfoComponent {
  constructor(private readonly page: Page) {}

  async clickAddCustomer() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/addCustomer/);
    await expect(this.page.getByRole('heading', { name: 'Add Customer' })).toBeVisible();
  }

  async createCustomer(customerName: string, customerDescription: string) {
    await this.waitForLoader();

    const customerForm = this.page.locator('.orangehrm-card-container');

    await customerForm.locator('input.oxd-input').fill(customerName);
    await customerForm.locator('textarea').fill(customerDescription);
    await customerForm.getByRole('button', { name: 'Save' }).click();

    await this.verifySuccessfullySavedToast();
    await this.waitForLoader();

    await expect(this.page).toHaveURL(/viewCustomers/);
    await expect(this.page.getByRole('heading', { name: 'Customers' })).toBeVisible();
  }

  async verifyCustomerInTable(customerName: string) {
    await this.waitForLoader();

    const customerRow = this.page.locator('.oxd-table-body .oxd-table-card').filter({ hasText: customerName });

    await expect(customerRow).toBeVisible();
    await expect(customerRow).toContainText(customerName);
  }

  async clickAddProject() {
    await this.waitForLoader();
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.waitForLoader();

    await expect(this.page).toHaveURL(/saveProject/);
    await expect(this.page.getByRole('heading', { name: 'Add Project' })).toBeVisible();
  }

  async createProject(customerName: string, projectName: string, projectDescription: string) {
    await this.waitForLoader();

    const projectForm = this.page.locator('.orangehrm-card-container');
    const projectNameInput = projectForm.locator('input.oxd-input').first();
    const customerInput = projectForm.getByPlaceholder('Type for hints...').first();
    const projectAdminInput = projectForm.getByPlaceholder('Type for hints...').nth(1);
    const loggedInEmployeeSearchText = await this.getLoggedInEmployeeSearchText();

    await projectNameInput.fill(projectName);
    await this.selectExactAutocompleteOption(customerInput, customerName, 'Customer Name');
    await projectForm.locator('textarea').fill(projectDescription);
    await this.selectFirstAutocompleteOption(projectAdminInput, loggedInEmployeeSearchText, 'Project Admin');
    await projectForm.getByRole('button', { name: 'Save' }).click();

    await this.verifySuccessfullySavedToast();
    await this.waitForLoader();

    await expect(this.page).toHaveURL(/saveProject\/\d+/);
    await expect(this.page.getByRole('heading', { name: 'Edit Project' })).toBeVisible();
  }

  async copyActivitiesFromProject(sourceProjectName: string, expectedActivity: string) {
    await this.waitForLoader();

    await expect(this.page.getByRole('heading', { name: 'Activities' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Copy From' }).click();

    const dialog = this.page.getByRole('dialog');

    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Copy Activity', { exact: true })).toBeVisible();

    const projectInput = dialog.getByPlaceholder('Type for hints...');

    await this.selectContainingAutocompleteOption(projectInput, sourceProjectName, 'Source Project');
    await expect(dialog.getByText(expectedActivity, { exact: true })).toBeVisible();

    await dialog.getByRole('button', { name: 'Save' }).click();

    await this.verifySuccessfullySavedToast();
    await expect(dialog).toBeHidden();
    await this.waitForLoader();

    await expect(this.page.getByText(expectedActivity, { exact: true })).toBeVisible();
  }

  async editProject(currentProjectName: string, updatedProjectName: string, updatedProjectDescription: string) {
    await this.waitForLoader();

    const projectForm = this.page.locator('.orangehrm-card-container').first();
    const projectNameInput = projectForm.locator('input.oxd-input').first();
    const projectDescriptionInput = projectForm.locator('textarea');
    const saveButton = projectForm.getByRole('button', { name: 'Save' });

    await expect(projectNameInput).toHaveValue(currentProjectName);
    await projectNameInput.fill(updatedProjectName);
    await projectDescriptionInput.fill(updatedProjectDescription);

    await expect(projectNameInput).toHaveValue(updatedProjectName);
    await expect(projectDescriptionInput).toHaveValue(updatedProjectDescription);

    await Promise.all([
      this.page.waitForURL(/viewProjects/),
      saveButton.click()
    ]);

    await this.waitForLoader();
    await expect(this.page).toHaveURL(/viewProjects/);
  }

  async verifyUpdatedProjectInTable(customerName: string, updatedProjectName: string) {
    await this.waitForLoader();

    const projectRow = this.page.locator('.oxd-table-body .oxd-table-card').filter({ hasText: customerName });

    await expect(projectRow).toBeVisible();
    await expect(projectRow).toContainText(updatedProjectName);
  }

  private async getLoggedInEmployeeSearchText(): Promise<string> {
    const profileName = await this.page.locator('.oxd-userdropdown-name').textContent();

    if (!profileName?.trim()) {
      throw new Error('Unable to read the currently logged-in employee name.');
    }

    return profileName.trim().split(' ')[0];
  }

  private async selectExactAutocompleteOption(input: Locator, value: string, fieldName: string) {
    await input.clear();
    await input.fill(value);

    const dropdown = this.page.locator('.oxd-autocomplete-dropdown:visible');

    await expect(dropdown).toBeVisible({ timeout: 15000 });
    await this.waitForAutocompleteSearch(dropdown);

    const noRecordsOption = dropdown.getByRole('option', { name: 'No Records Found', exact: true });

    if (await noRecordsOption.isVisible().catch(() => false)) {
      throw new Error(`${fieldName} autocomplete returned no result for "${value}".`);
    }

    const exactOption = dropdown.getByRole('option', { name: value, exact: true });

    await expect(exactOption).toBeVisible({ timeout: 15000 });
    await exactOption.click();
    await expect(dropdown).toBeHidden();
    await expect(input).toHaveValue(value);
  }

  private async selectContainingAutocompleteOption(input: Locator, value: string, fieldName: string) {
    await input.clear();
    await input.fill(value);

    const dropdown = this.page.locator('.oxd-autocomplete-dropdown:visible');

    await expect(dropdown).toBeVisible({ timeout: 15000 });
    await this.waitForAutocompleteSearch(dropdown);

    const noRecordsOption = dropdown.getByRole('option', { name: 'No Records Found', exact: true });

    if (await noRecordsOption.isVisible().catch(() => false)) {
      throw new Error(`${fieldName} autocomplete returned no result for "${value}".`);
    }

    const matchingOption = dropdown.getByRole('option').filter({ hasText: value }).first();

    await expect(matchingOption).toBeVisible({ timeout: 15000 });
    await matchingOption.click();
    await expect(dropdown).toBeHidden();

    const selectedValue = await input.inputValue();
    expect(selectedValue).toContain(value);
  }

  private async selectFirstAutocompleteOption(input: Locator, searchText: string, fieldName: string) {
    await input.clear();
    await input.fill(searchText);

    const dropdown = this.page.locator('.oxd-autocomplete-dropdown:visible');

    await expect(dropdown).toBeVisible({ timeout: 15000 });
    await this.waitForAutocompleteSearch(dropdown);

    const noRecordsOption = dropdown.getByRole('option', { name: 'No Records Found', exact: true });

    if (await noRecordsOption.isVisible().catch(() => false)) {
      throw new Error(`${fieldName} autocomplete returned no result for "${searchText}".`);
    }

    const firstValidOption = dropdown.getByRole('option').filter({ hasNotText: 'Searching' }).filter({ hasNotText: 'No Records Found' }).first();

    await expect(firstValidOption).toBeVisible({ timeout: 15000 });
    await firstValidOption.click();
    await expect(dropdown).toBeHidden();

    const selectedValue = await input.inputValue();
    expect(selectedValue.trim()).not.toBe('');
  }

  private async waitForAutocompleteSearch(dropdown: Locator) {
    const searchingOption = dropdown.getByRole('option', { name: /Searching/ });

    if (await searchingOption.isVisible().catch(() => false)) {
      await expect(searchingOption).toBeHidden({ timeout: 20000 });
    }
  }

  private async verifySuccessfullySavedToast() {
    await expect(this.page.locator('.oxd-toast').filter({ hasText: 'Successfully Saved' })).toBeVisible();
  }

  private async waitForLoader() {
    const loader = this.page.locator('.oxd-loading-spinner');

    if (await loader.isVisible().catch(() => false)) {
      await loader.waitFor({ state: 'hidden' });
    }
  }
}