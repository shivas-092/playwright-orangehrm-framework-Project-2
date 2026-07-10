import { Page, expect } from '@playwright/test';

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

  private vacancySearchDropdown() {
    return this.page.locator('(//div[contains(@class,"oxd-select-text")])[2]');
  }

  async clickAddVacancy() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Add Vacancy' })
    ).toBeVisible();
  }

  async createVacancy(vacancy: any) {
    await this.vacancyNameInput().fill(vacancy.vacancyName);

    await this.jobTitleDropdown().click();
    await this.page.getByRole('option', { name: vacancy.jobTitle }).click();

    await this.page
      .getByPlaceholder('Type description here')
      .fill(vacancy.description);

    await this.hiringManagerInput().fill(vacancy.hiringManager);
    await this.page.getByRole('option', { name: vacancy.hiringManager }).click();

    await this.numberOfPositionsInput().fill(vacancy.positions);

    await this.page.getByRole('button', { name: 'Save' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Edit Vacancy' })
    ).toBeVisible();

    await expect(this.vacancyNameInput()).toHaveValue(vacancy.vacancyName);
  }

 async searchVacancy(vacancyName: string) {
  await this.page.getByRole('link', { name: 'Vacancies' }).click();

  await expect(
    this.page.getByRole('heading', { name: 'Vacancies' })
  ).toBeVisible();

  await expect(
    this.page.locator('.oxd-table-body').getByText(vacancyName)
  ).toBeVisible();
}
}