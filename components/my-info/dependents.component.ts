import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface DependentData {
  name: string;
  relationship: string;
}

export class DependentComponent {
  constructor(private readonly page: Page) {}

  async addDependent(data: DependentData) {
    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewDependents\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Assigned Dependents',
        exact: true
      })
    ).toBeVisible();

    await this.clickAddDependent();

    const dependentForm = this.page.locator('form').first();

    await expect(dependentForm).toBeVisible();

    const nameInput = this.getInputByExactLabel(dependentForm, 'Name');
    const relationshipDropdown = this.getDropdownByExactLabel(dependentForm, 'Relationship');

    await FormUtil.fill(nameInput, data.name);
    await FormUtil.selectDropdownByText(this.page, relationshipDropdown, data.relationship);

    const saveButton = dependentForm.getByRole('button', {
      name: 'Save',
      exact: true
    });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();

    await FormUtil.waitForLoader(this.page);

    await this.verifyDependentInTable(data.name, data.relationship);
  }

  private async clickAddDependent() {
  const addButton = this.page
    .getByRole('heading', {
      name: 'Assigned Dependents',
      exact: true
    })
    .locator('xpath=following::button[1]');

  await expect(addButton).toBeVisible();
  await expect(addButton).toBeEnabled();

  await addButton.click();

  await expect(
    this.page.getByRole('heading', {
      name: 'Add Dependent',
      exact: true
    })
  ).toBeVisible();
}

  private async verifyDependentInTable(name: string, relationship: string) {
    const dependentRow = this.page.locator('.oxd-table-card').filter({
      hasText: name
    });

    await expect(dependentRow).toBeVisible({ timeout: 15000 });
    await expect(dependentRow).toContainText(name);
    await expect(dependentRow).toContainText(relationship);
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