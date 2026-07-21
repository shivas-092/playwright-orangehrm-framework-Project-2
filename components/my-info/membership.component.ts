import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface MembershipData {
  membership: string;
  subscriptionPaidBy: string;
  subscriptionAmount: string;
  currency: string;
}

export class MembershipComponent {
  constructor(private readonly page: Page) {}

  async addMembership(data: MembershipData) {
    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewMemberships\/empNumber\/\d+/);
    await expect(this.page.getByRole('heading', { name: 'Assigned Memberships', exact: true })).toBeVisible();

    await this.clickAddMembership();

    const membershipForm = this.page.locator('form').first();

    await expect(membershipForm).toBeVisible();

    const membershipDropdown = this.getDropdownByExactLabel(membershipForm, 'Membership');
    const subscriptionPaidByDropdown = this.getDropdownByExactLabel(membershipForm, 'Subscription Paid By');
    const subscriptionAmountInput = this.getInputByExactLabel(membershipForm, 'Subscription Amount');
    const currencyDropdown = this.getDropdownByExactLabel(membershipForm, 'Currency');

    await FormUtil.selectDropdownByText(this.page, membershipDropdown, data.membership);
    await FormUtil.selectDropdownByText(this.page, subscriptionPaidByDropdown, data.subscriptionPaidBy);
    await FormUtil.fill(subscriptionAmountInput, data.subscriptionAmount);
    await FormUtil.selectDropdownByText(this.page, currencyDropdown, data.currency);

    await expect(membershipDropdown).toContainText(data.membership);
    await expect(subscriptionPaidByDropdown).toContainText(data.subscriptionPaidBy);
    await expect(subscriptionAmountInput).toHaveValue(data.subscriptionAmount);
    await expect(currencyDropdown).toContainText(data.currency);

    const saveButton = membershipForm.getByRole('button', { name: 'Save', exact: true });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();

    await FormUtil.waitForLoader(this.page);

    await expect(this.page.getByRole('heading', { name: 'Add Membership', exact: true })).toBeHidden({ timeout: 15000 });

    await this.verifyMembershipInTable(data.membership, data.subscriptionPaidBy);
  }

  private async clickAddMembership() {
    const addButton = this.page
      .getByRole('heading', { name: 'Assigned Memberships', exact: true })
      .locator('xpath=following::button[1]');

    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

    await expect(this.page.getByRole('heading', { name: 'Add Membership', exact: true })).toBeVisible();
  }

  private async verifyMembershipInTable(membership: string, subscriptionPaidBy: string) {
    const membershipRow = this.page.locator('.oxd-table-card').filter({
      hasText: membership
    }).last();

    await expect(membershipRow).toBeVisible({ timeout: 15000 });
    await expect(membershipRow).toContainText(membership);
    await expect(membershipRow).toContainText(subscriptionPaidBy);
  }

  private getInputByExactLabel(form: Locator, label: string): Locator {
    const inputGroup = form.locator('.oxd-input-group').filter({
      has: this.page.locator('.oxd-label').filter({
        hasText: new RegExp(`^${this.escapeRegExp(label)}\\*?$`)
      })
    });

    return inputGroup.locator('input');
  }

  private getDropdownByExactLabel(form: Locator, label: string): Locator {
    const inputGroup = form.locator('.oxd-input-group').filter({
      has: this.page.locator('.oxd-label').filter({
        hasText: new RegExp(`^${this.escapeRegExp(label)}\\*?$`)
      })
    });

    return inputGroup.locator('.oxd-select-text');
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}