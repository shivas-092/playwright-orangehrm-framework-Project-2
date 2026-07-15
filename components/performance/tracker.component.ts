import { Page, expect, Locator } from '@playwright/test';

export type TrackerDetails = {
  trackerName: string;
  employeeName: string;
  reviewerName: string;
};

export class TrackerComponent {
  constructor(private readonly page: Page) {}

  private get formContainer(): Locator {
    return this.page.locator('.orangehrm-card-container');
  }

  private get formTextboxes(): Locator {
    return this.formContainer.getByRole('textbox');
  }

  async navigateToTrackers() {
    await this.page.goto('/web/index.php/performance/viewPerformanceTracker', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Performance Trackers' })).toBeVisible();
  }

  async clickAddTracker() {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page).toHaveURL(/addPerformanceTracker/);
    await expect(this.page.getByRole('heading', { name: 'Add Performance Tracker' })).toBeVisible();
  }

  async createTracker(tracker: TrackerDetails) {
    await expect(this.formTextboxes).toHaveCount(3);
    await this.formTextboxes.nth(0).fill(tracker.trackerName);
    await this.selectAutocompleteValue(this.formTextboxes.nth(1), tracker.employeeName);
    await this.selectAutocompleteValue(this.formTextboxes.nth(2), tracker.reviewerName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page.getByText('Successfully Saved', { exact: false })).toBeVisible();
    await expect(this.page).toHaveURL(/viewPerformanceTracker/);
  }

  async searchTracker(employeeName: string) {
    await this.page.goto('/web/index.php/performance/viewPerformanceTracker', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Performance Trackers' })).toBeVisible();

    const searchEmployeeTextbox = this.page.getByPlaceholder('Type for hints...').first();

    await this.selectAutocompleteValue(searchEmployeeTextbox, employeeName);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await expect(this.page.getByRole('table')).toBeVisible();
  }

  async verifyTrackerExists(trackerName: string) {
    await expect(this.page.getByRole('cell', { name: trackerName, exact: true })).toBeVisible();
  }

  private async selectAutocompleteValue(textbox: Locator, value: string) {
    await textbox.fill(value.substring(0, 2));

    const matchingOption = this.page.getByRole('option').filter({ hasText: value }).first();

    await expect(matchingOption).toBeVisible();
    await matchingOption.click();
  }
}