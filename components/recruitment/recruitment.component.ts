import { Page, expect } from '@playwright/test';

export class RecruitmentComponent {
  constructor(private readonly page: Page) {}

  async navigateToRecruitment() {
    await this.page.goto('/web/index.php/recruitment/viewCandidates', {
      waitUntil: 'domcontentloaded'
    });

    await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates/);
    await this.waitForLoader();

    await expect(this.page.getByRole('heading', { name: 'Recruitment', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Candidates', exact: true })).toBeVisible();
  }

  async openVacanciesTab() {
    await this.page.goto('/web/index.php/recruitment/viewJobVacancy', {
      waitUntil: 'domcontentloaded'
    });

    await expect(this.page).toHaveURL(/\/recruitment\/viewJobVacancy/);
    await this.waitForLoader();

    await expect(this.page.getByRole('heading', { name: 'Recruitment', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Vacancies', exact: true })).toBeVisible();
  }

  async openCandidatesTab() {
    await this.page.goto('/web/index.php/recruitment/viewCandidates', {
      waitUntil: 'domcontentloaded'
    });

    await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates/);
    await this.waitForLoader();

    await expect(this.page.getByRole('heading', { name: 'Recruitment', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Candidates', exact: true })).toBeVisible();
  }

  private async waitForLoader() {
    const loader = this.page.locator('.oxd-loading-spinner');

    if (await loader.isVisible().catch(() => false)) {
      await loader.waitFor({
        state: 'hidden',
        timeout: 15000
      });
    }
  }
}