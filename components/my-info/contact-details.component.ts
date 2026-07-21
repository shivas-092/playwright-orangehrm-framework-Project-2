import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface ContactDetailsData {
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  country: string;
  homeTelephone: string;
  mobileTelephone: string;
  workTelephone: string;
  otherEmail: string;
}

export class ContactDetailsComponent {
  constructor(private readonly page: Page) {}

  async updateContactDetails(data: ContactDetailsData) {
    await FormUtil.waitForLoader(this.page);
    await expect(this.page).toHaveURL(/\/pim\/contactDetails\/empNumber\/\d+/);
    await expect(this.page.getByRole('heading', { name: 'Contact Details', exact: true })).toBeVisible();

    const contactDetailsForm = this.page.locator('form').first();
    await expect(contactDetailsForm).toBeVisible();

    const street1Input = this.getInputByExactLabel(contactDetailsForm, 'Street 1');
    const street2Input = this.getInputByExactLabel(contactDetailsForm, 'Street 2');
    const cityInput = this.getInputByExactLabel(contactDetailsForm, 'City');
    const stateProvinceInput = this.getInputByExactLabel(contactDetailsForm, 'State/Province');
    const zipPostalCodeInput = this.getInputByExactLabel(contactDetailsForm, 'Zip/Postal Code');
    const homeTelephoneInput = this.getInputByExactLabel(contactDetailsForm, 'Home');
    const mobileTelephoneInput = this.getInputByExactLabel(contactDetailsForm, 'Mobile');
    const workTelephoneInput = this.getInputByExactLabel(contactDetailsForm, 'Work');
    const otherEmailInput = this.getInputByExactLabel(contactDetailsForm, 'Other Email');

    await FormUtil.fill(street1Input, data.street1);
    await FormUtil.fill(street2Input, data.street2);
    await FormUtil.fill(cityInput, data.city);
    await FormUtil.fill(stateProvinceInput, data.stateProvince);
    await FormUtil.fill(zipPostalCodeInput, data.zipPostalCode);
    await FormUtil.fill(homeTelephoneInput, data.homeTelephone);
    await FormUtil.fill(mobileTelephoneInput, data.mobileTelephone);
    await FormUtil.fill(workTelephoneInput, data.workTelephone);
    await FormUtil.fill(otherEmailInput, data.otherEmail);

    await this.selectCountry(contactDetailsForm, data.country);

   const saveButton = contactDetailsForm.getByRole('button', { name: 'Save', exact: true });

await expect(saveButton).toBeVisible();
await expect(saveButton).toBeEnabled();

await saveButton.scrollIntoViewIfNeeded();
await saveButton.click();

const successToast = this.page.locator('.oxd-toast');

await expect(successToast).toContainText(/Successfully Updated|Successfully Saved/i, { timeout: 15000 });

await FormUtil.waitForLoader(this.page);
  }

  private getInputByExactLabel(form: Locator, label: string): Locator {
    return form.locator('.oxd-input-group').filter({ has: this.page.locator('.oxd-label').filter({ hasText: new RegExp(`^${this.escapeRegExp(label)}$`) }) }).locator('input');
  }

  private async selectCountry(form: Locator, country: string) {
    const countryGroup = form.locator('.oxd-input-group').filter({ has: this.page.locator('.oxd-label').filter({ hasText: /^Country$/ }) });
    const countryDropdown = countryGroup.locator('.oxd-select-text');
    await FormUtil.selectDropdownByText(this.page, countryDropdown, country);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}