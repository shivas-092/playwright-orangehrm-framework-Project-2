import { expect, Page } from '@playwright/test';
import { ClaimComponent } from './claim.component';

export class EventComponent extends ClaimComponent {
  constructor(page: Page) {
    super(page);
  }

  async navigateToEvents() {
    await this.navigateToClaim();
    await this.openEvents();
  }

  async clickAddEvent() {
    await this.clickAdd();
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/claim\/saveEvents/);
    await expect(this.page.getByRole('heading', { name: 'Add Event' })).toBeVisible();
  }

  async createEvent(eventName: string, description: string) {
    await this.waitForLoader();

    const eventForm = this.page.locator('.orangehrm-card-container');
    const eventNameInput = eventForm.locator('input.oxd-input').first();
    const descriptionInput = eventForm.locator('textarea');

    await this.fillField(eventNameInput, eventName);
    await this.fillField(descriptionInput, description);
    await expect(eventNameInput).toHaveValue(eventName);
    await this.clickSave();
    await this.verifySuccessToast();
  }
}