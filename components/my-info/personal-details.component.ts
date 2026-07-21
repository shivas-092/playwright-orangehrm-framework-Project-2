import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface PersonalDetailsData {
  middleName: string;
  otherId: string;
  driverLicenseNumber: string;
}

export class PersonalDetailsComponent {
  constructor(private readonly page: Page) {}

  async updatePersonalDetails(data: PersonalDetailsData) {
    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

    const personalDetailsForm = this.page.locator('form').first();
    const middleNameInput = this.page.getByRole('textbox', { name: 'Middle Name' });
    const otherIdInput = this.getInputFromGroup(personalDetailsForm, 'Other Id');
    const driverLicenseInput = this.getInputFromGroup(personalDetailsForm, "Driver's License Number");

    await FormUtil.fill(middleNameInput, data.middleName);
    await FormUtil.fill(otherIdInput, data.otherId);
    await FormUtil.fill(driverLicenseInput, data.driverLicenseNumber);

    await expect(middleNameInput).toHaveValue(data.middleName);
    await expect(otherIdInput).toHaveValue(data.otherId);
    await expect(driverLicenseInput).toHaveValue(data.driverLicenseNumber);

    await personalDetailsForm.getByRole('button', { name: 'Save' }).click();
    await FormUtil.verifyUpdatedToast(this.page);
    await FormUtil.waitForLoader(this.page);
  }

  private getInputFromGroup(form: Locator, label: string): Locator {
    return form.locator('.oxd-input-group').filter({ hasText: label }).locator('input');
  }
}