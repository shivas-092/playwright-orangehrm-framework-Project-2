import { Page, expect } from '@playwright/test';

export class CandidateComponent {
  constructor(private readonly page: Page) {}

  private firstNameInput() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  private lastNameInput() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  private vacancyDropdown() {
    return this.page.locator('(//div[contains(@class,"oxd-select-text")])[1]');
  }

  private emailInput() {
    return this.page.locator('(//input[@placeholder="Type here"])[1]');
  }

  private contactNumberInput() {
    return this.page.locator('(//input[@placeholder="Type here"])[2]');
  }

  private keywordsInput() {
    return this.page.getByPlaceholder('Enter comma seperated words...');
  }

  private notesInput() {
    return this.page.locator('textarea');
  }

  private saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async clickAddCandidate() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Add Candidate' })
    ).toBeVisible();
  }

  async addCandidate(candidate: any, vacancyName: string) {
    await this.firstNameInput().fill(candidate.firstName);
    await this.lastNameInput().fill(candidate.lastName);

    await this.vacancyDropdown().click();
    await this.page.getByText(vacancyName, { exact: true }).click();

    await this.emailInput().fill(candidate.email);
    await this.contactNumberInput().fill(candidate.contactNumber);
    await this.keywordsInput().fill(candidate.keywords);
    await this.notesInput().fill(candidate.notes);

    await this.saveButton().click();

    await expect(
      this.page.getByRole('heading', { name: 'Candidate Profile' })
    ).toBeVisible();
  }

  async shortlistCandidate() {
    await this.page.getByRole('button', { name: 'Shortlist' }).click();
    await this.saveButton().click();

    await expect(
      this.page.getByText('Status: Shortlisted')
    ).toBeVisible();
  }
async searchCandidate(candidateName: string) {
  await this.page.getByRole('link', { name: 'Candidates' }).click();

  await expect(
    this.page.getByRole('heading', { name: 'Candidates' })
  ).toBeVisible();

  await this.page
    .getByPlaceholder('Type for hints...')
    .fill(candidateName);

  await this.page.getByRole('button', { name: 'Search' }).click();

  await expect(
    this.page.locator('.oxd-table-body').getByText(candidateName)
  ).toBeVisible();
}
}