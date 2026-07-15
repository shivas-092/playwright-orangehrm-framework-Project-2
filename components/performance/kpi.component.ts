import { Page, expect, Locator } from '@playwright/test';

export type KPIData = {
  name: string;
  jobTitle: string;
  minimumRating: string;
  maximumRating: string;
  makeDefaultScale?: boolean;
};

export class KPIComponent {
  constructor(private readonly page: Page) {}

  private get formContainer(): Locator {
    return this.page.locator('.orangehrm-card-container');
  }

  private get formInputs(): Locator {
    return this.formContainer.locator('input.oxd-input');
  }

  private get formJobTitleDropdown(): Locator {
    return this.formContainer.locator('.oxd-select-text').first();
  }

  async navigateToKPI() {
    await this.page.goto('/web/index.php/performance/searchKpi', { waitUntil: 'domcontentloaded' });
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'Key Performance Indicators for Job Title' })).toBeVisible();
  }

  async clickAddKPI() {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page).toHaveURL(/saveKpi/);
    await this.waitForFormLoader();
    await expect(this.page.getByText('Add Key Performance Indicator', { exact: true })).toBeVisible();
  }

  async addKPI(kpi: KPIData) {
    await this.waitForFormLoader();
    await expect(this.formInputs).toHaveCount(3);
    await this.formInputs.nth(0).fill(kpi.name);
    await this.selectFormJobTitle(kpi.jobTitle);
    await this.formInputs.nth(1).fill(kpi.minimumRating);
    await this.formInputs.nth(2).fill(kpi.maximumRating);

    if (kpi.makeDefaultScale === true) {
      const defaultScaleCheckbox = this.formContainer.getByRole('checkbox');

      if (!(await defaultScaleCheckbox.isChecked())) {
        await defaultScaleCheckbox.check();
      }
    }

    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page.getByText('Successfully Saved', { exact: false })).toBeVisible();
    await expect(this.page).toHaveURL(/searchKpi/);
    await this.waitForFormLoader();
  }

  async searchKPI(jobTitle: string) {
    await this.page.goto('/web/index.php/performance/searchKpi', { waitUntil: 'domcontentloaded' });
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'Key Performance Indicators for Job Title' })).toBeVisible();

    const searchJobTitleDropdown = this.page.locator('.oxd-select-text').first();

    await searchJobTitleDropdown.click();
    await this.page.getByRole('option', { name: jobTitle, exact: true }).click();
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForFormLoader();
    await expect(this.page.getByRole('table')).toBeVisible();
  }

  async verifyKPIExists(kpiName: string) {
    await expect(this.getKPIRow(kpiName)).toBeVisible();
  }

  async openKPIForEdit(kpiName: string) {
    const kpiRow = this.getKPIRow(kpiName);

    await expect(kpiRow).toBeVisible();
    await kpiRow.locator('button').first().click();
    await expect(this.page).toHaveURL(/saveKpi\/\d+/);
    await this.waitForFormLoader();
    await expect(this.page.getByText('Edit Key Performance Indicator', { exact: true })).toBeVisible();
  }

  async editKPI(updatedName: string, updatedMinimumRating: string, updatedMaximumRating: string) {
    await this.waitForFormLoader();
    await expect(this.formInputs).toHaveCount(3);
    await this.formInputs.nth(0).fill(updatedName);
    await this.formInputs.nth(1).fill(updatedMinimumRating);
    await this.formInputs.nth(2).fill(updatedMaximumRating);
    await expect(this.formInputs.nth(0)).toHaveValue(updatedName);
    await expect(this.formInputs.nth(1)).toHaveValue(updatedMinimumRating);
    await expect(this.formInputs.nth(2)).toHaveValue(updatedMaximumRating);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page.getByText('Successfully Updated', { exact: false })).toBeVisible();
    await expect(this.page).toHaveURL(/searchKpi/);
    await this.waitForFormLoader();
  }

  async deleteKPI(kpiName: string) {
    const kpiRow = this.getKPIRow(kpiName);

    await expect(kpiRow).toBeVisible();
    await kpiRow.locator('button').nth(1).click();
    await expect(this.page.getByText('Are you Sure?', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Successfully Deleted', { exact: false })).toBeVisible();
    await this.waitForFormLoader();
  }

  async verifyKPIDeleted(kpiName: string) {
    await expect(this.getKPIRow(kpiName)).toHaveCount(0);
  }

  private async selectFormJobTitle(jobTitle: string) {
    await this.formJobTitleDropdown.click();
    await this.page.getByRole('option', { name: jobTitle, exact: true }).click();
  }

  private getKPIRow(kpiName: string): Locator {
    return this.page.locator('.oxd-table-card').filter({ hasText: kpiName });
  }

  private async waitForFormLoader() {
    const loader = this.page.locator('.oxd-form-loader');

    if (await loader.count()) {
      await loader.waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    }
  }
}