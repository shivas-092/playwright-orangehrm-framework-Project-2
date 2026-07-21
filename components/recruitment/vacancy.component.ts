import { Page, expect } from '@playwright/test';

export interface VacancyData {
  vacancyName: string;
  jobTitle: string;
  description: string;
  hiringManager: string;
  positions: string;
}

export class VacancyComponent {
  constructor(private readonly page: Page) {}

  private vacancyNameInput() {
    return this.page.locator(
      '//div[contains(@class,"oxd-input-group")][.//*[contains(text(),"Vacancy Name")]]//input'
    );
  }

  private jobTitleDropdown() {
    return this.page.locator('(//div[contains(@class,"oxd-select-text")])[1]');
  }

  private hiringManagerInput() {
    return this.page.getByPlaceholder('Type for hints...');
  }

  private numberOfPositionsInput() {
    return this.page.locator(
      '//div[contains(@class,"oxd-input-group")][.//*[contains(text(),"Number of Positions")]]//input'
    );
  }

  async clickAddVacancy() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Vacancies',
        exact: true
      })
    ).toBeVisible();

    const addButton = this.page.getByRole('button', {
      name: /Add$/
    });

    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Add Vacancy',
        exact: true
      })
    ).toBeVisible();
  }

  async createVacancy(vacancy: VacancyData) {
    await this.vacancyNameInput().fill(vacancy.vacancyName);

    await this.jobTitleDropdown().click();

    await this.page.getByRole('option', {
      name: vacancy.jobTitle,
      exact: true
    }).click();

    await this.page.getByPlaceholder('Type description here').fill(vacancy.description);

    await this.hiringManagerInput().fill(vacancy.hiringManager);

    await this.page.getByRole('option', {
      name: vacancy.hiringManager,
      exact: true
    }).click();

    await this.numberOfPositionsInput().fill(vacancy.positions);

    const saveButton = this.page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Edit Vacancy',
        exact: true
      })
    ).toBeVisible();

    await expect(this.vacancyNameInput()).toHaveValue(vacancy.vacancyName);
  }

  async searchVacancy(vacancyName: string) {
    await this.page.goto('/web/index.php/recruitment/viewJobVacancy', {
      waitUntil: 'domcontentloaded'
    });

    await expect(this.page).toHaveURL(/\/recruitment\/viewJobVacancy/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Vacancies',
        exact: true
      })
    ).toBeVisible();

    const vacancyRow = this.page.locator('.oxd-table-card').filter({
      hasText: vacancyName
    }).last();

    await expect(vacancyRow).toBeVisible({ timeout: 15000 });
    await expect(vacancyRow).toContainText(vacancyName);
  }
}