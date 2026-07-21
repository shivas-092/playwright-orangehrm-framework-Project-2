import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface EmergencyContactData {
  name: string;
  relationship: string;
  homeTelephone: string;
  mobileTelephone: string;
  workTelephone: string;
}

export class EmergencyContactComponent {
  constructor(private readonly page: Page) {}

  async addEmergencyContact(data: EmergencyContactData) {
    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewEmergencyContacts\/empNumber\/\d+/);

    const assignedContactsHeading = this.page.getByRole('heading', {
      name: 'Assigned Emergency Contacts'
    });

    await expect(assignedContactsHeading).toBeVisible();

    const assignedContactsHeader = assignedContactsHeading.locator('..');
    const addButton = assignedContactsHeader.getByRole('button', { name: /Add/ });

    await expect(addButton).toBeVisible();
    await addButton.click();

    await FormUtil.waitForLoader(this.page);

    const formHeading = this.page.getByRole('heading', {
      name: 'Save Emergency Contact'
    });

    await expect(formHeading).toBeVisible();

    const emergencyContactForm = this.page.locator('form').first();

    await expect(emergencyContactForm).toBeVisible();

    const nameInput = this.getInputByExactLabel(emergencyContactForm, 'Name');
    const relationshipInput = this.getInputByExactLabel(emergencyContactForm, 'Relationship');
    const homeTelephoneInput = this.getInputByExactLabel(emergencyContactForm, 'Home Telephone');
    const mobileTelephoneInput = this.getInputByExactLabel(emergencyContactForm, 'Mobile');
    const workTelephoneInput = this.getInputByExactLabel(emergencyContactForm, 'Work Telephone');

    await FormUtil.fill(nameInput, data.name);
    await FormUtil.fill(relationshipInput, data.relationship);
    await FormUtil.fill(homeTelephoneInput, data.homeTelephone);
    await FormUtil.fill(mobileTelephoneInput, data.mobileTelephone);
    await FormUtil.fill(workTelephoneInput, data.workTelephone);

    await emergencyContactForm.getByRole('button', { name: 'Save', exact: true }).click();

    await FormUtil.verifySavedToast(this.page);
    await FormUtil.waitForLoader(this.page);

    await this.verifyEmergencyContactInTable(data);
  }

  async verifyEmergencyContactInTable(data: EmergencyContactData) {
    const emergencyContactRow = this.page
      .locator('.oxd-table-card')
      .filter({ hasText: data.name });

    await expect(emergencyContactRow).toBeVisible();
    await expect(emergencyContactRow).toContainText(data.name);
    await expect(emergencyContactRow).toContainText(data.relationship);
    await expect(emergencyContactRow).toContainText(data.mobileTelephone);
  }

  private getInputByExactLabel(form: Locator, label: string): Locator {
    return form
      .locator('.oxd-input-group')
      .filter({
        has: this.page.locator('.oxd-label').filter({
          hasText: new RegExp(`^${this.escapeRegExp(label)}\\*?$`)
        })
      })
      .locator('input');
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}