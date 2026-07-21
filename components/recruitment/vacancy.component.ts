import { Page, expect, Locator } from '@playwright/test';

export interface VacancyData {
  vacancyName: string;
  jobTitle: string;
  description: string;
  hiringManager: string;
  positions: string;
}

export class VacancyComponent {
  constructor(private readonly page: Page) {}

  private vacancyNameInput(): Locator {
    return this.page.locator(
      '//div[contains(@class,"oxd-input-group")][.//*[contains(text(),"Vacancy Name")]]//input'
    );
  }

  private jobTitleDropdown(): Locator {
    return this.page.locator('(//div[contains(@class,"oxd-select-text")])[1]');
  }

  private hiringManagerInput(): Locator {
    return this.page.getByPlaceholder('Type for hints...');
  }

  private numberOfPositionsInput(): Locator {
    return this.page.locator(
      '//div[contains(@class,"oxd-input-group")][.//*[contains(text(),"Number of Positions")]]//input'
    );
  }

  private descriptionInput(): Locator {
    return this.page.getByPlaceholder('Type description here');
  }

  async clickAddVacancy() {
    await expect(this.page.getByRole('heading', { name: 'Vacancies', exact: true })).toBeVisible();

    const addButton = this.page.getByRole('button', { name: /Add$/ });

    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();
    await addButton.click();

    await expect(this.page.getByRole('heading', { name: 'Add Vacancy', exact: true })).toBeVisible();
    await expect(this.vacancyNameInput()).toBeVisible();
  }

  async createVacancy(vacancy: VacancyData) {
    await expect(this.vacancyNameInput()).toBeVisible();

    await this.vacancyNameInput().fill(vacancy.vacancyName);

    await this.jobTitleDropdown().click();

    const jobTitleOption = this.page.getByRole('option', {
      name: vacancy.jobTitle,
      exact: true
    });

    await expect(jobTitleOption).toBeVisible({ timeout: 10000 });
    await jobTitleOption.click();

    await this.descriptionInput().fill(vacancy.description);

    await this.selectAvailableHiringManager();

    await this.numberOfPositionsInput().fill(vacancy.positions);

    const saveButton = this.page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(this.page.getByRole('heading', { name: 'Edit Vacancy', exact: true })).toBeVisible();
    await expect(this.vacancyNameInput()).toHaveValue(vacancy.vacancyName);
  }

  async searchVacancy(vacancyName: string) {
    await this.page.goto('/web/index.php/recruitment/viewJobVacancy', {
      waitUntil: 'domcontentloaded'
    });

    await expect(this.page).toHaveURL(/\/recruitment\/viewJobVacancy/);
    await expect(this.page.getByRole('heading', { name: 'Vacancies', exact: true })).toBeVisible();

    const vacancyRow = this.page.locator('.oxd-table-card').filter({
      hasText: vacancyName
    }).first();

    await expect(vacancyRow).toBeVisible({ timeout: 15000 });
    await expect(vacancyRow).toContainText(vacancyName);
  }

  private async selectAvailableHiringManager() {
    const input = this.hiringManagerInput();

    await input.clear();
    await input.fill('a');

    const dropdown = this.page.locator('.oxd-autocomplete-dropdown');
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    const availableOption = dropdown
      .getByRole('option')
      .filter({ hasNotText: /Searching\.\.\.|No Records Found/i })
      .first();

    await expect(availableOption).toBeVisible({ timeout: 15000 });

    const selectedManager = (await availableOption.textContent())?.trim();

    if (!selectedManager) {
      throw new Error('No valid hiring manager was returned by the autocomplete.');
    }

    await availableOption.click();
    await expect(input).toHaveValue(selectedManager, { timeout: 10000 });
  }
}