import { Page, expect } from '@playwright/test';

export class RecruitmentComponent {
  constructor(private readonly page: Page) {}

  async navigateToRecruitment() {
    await this.page.goto('/web/index.php/dashboard/index');

    const recruitmentLink = this.page.getByRole('link', {
      name: 'Recruitment',
    });

    await expect(recruitmentLink).toBeVisible();

    await recruitmentLink.click();

    await expect(this.page).toHaveURL(/viewCandidates/);

await expect(
  this.page.getByRole('heading', { name: 'Recruitment' })
).toBeVisible();

await expect(
  this.page.getByRole('heading', { name: 'Candidates' })
).toBeVisible();
  }

  async openVacanciesTab() {
    await this.page.getByRole('link', { name: 'Vacancies' }).click();
    await expect(this.page).toHaveURL(/viewJobVacancy/);
  }

  async openCandidatesTab() {
    await this.page.getByRole('link', { name: 'Candidates' }).click();
    await expect(this.page).toHaveURL(/viewCandidates/);
  }
}