import { Page, expect, Locator } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export interface WorkExperienceData {
  company: string;
  jobTitle: string;
  comment: string;
}

export class QualificationComponent {
  constructor(private readonly page: Page) {}

  async addWorkExperience(data: WorkExperienceData) {
    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewQualifications\/empNumber\/\d+/);
    await expect(this.page.getByRole('heading', { name: 'Qualifications', exact: true }).first()).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Work Experience', exact: true })).toBeVisible();

    await this.clickAddWorkExperience();

    const workExperienceForm = this.page.locator('form').first();
    await expect(workExperienceForm).toBeVisible();

    const companyInput = this.getInputByExactLabel(workExperienceForm, 'Company');
    const jobTitleInput = this.getInputByExactLabel(workExperienceForm, 'Job Title');
    const commentTextarea = this.getTextareaByExactLabel(workExperienceForm, 'Comment');

    await FormUtil.fill(companyInput, data.company);
    await FormUtil.fill(jobTitleInput, data.jobTitle);
    await commentTextarea.fill(data.comment);

    await expect(companyInput).toHaveValue(data.company);
    await expect(jobTitleInput).toHaveValue(data.jobTitle);
    await expect(commentTextarea).toHaveValue(data.comment);

    const saveButton = workExperienceForm.getByRole('button', { name: 'Save', exact: true });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();

    await FormUtil.waitForLoader(this.page);

    await expect(this.page.getByRole('heading', { name: 'Add Work Experience', exact: true })).toBeHidden({ timeout: 15000 });
    await this.verifyWorkExperienceInTable(data.company, data.jobTitle);
  }

  private async clickAddWorkExperience() {
    const addButton = this.page
      .getByRole('heading', { name: 'Work Experience', exact: true })
      .locator('xpath=following::button[1]');

    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();
    await addButton.click();

    await expect(this.page.getByRole('heading', { name: 'Add Work Experience', exact: true })).toBeVisible();
  }

  private async verifyWorkExperienceInTable(company: string, jobTitle: string) {
    const workExperienceRow = this.page.locator('.oxd-table-card').filter({ hasText: company });

    await expect(workExperienceRow).toBeVisible({ timeout: 15000 });
    await expect(workExperienceRow).toContainText(company);
    await expect(workExperienceRow).toContainText(jobTitle);
  }

  private getInputByExactLabel(form: Locator, label: string): Locator {
    const inputGroup = form.locator('.oxd-input-group').filter({
      has: this.page.locator('.oxd-label').filter({
        hasText: new RegExp(`^${this.escapeRegExp(label)}\\*?$`)
      })
    });

    return inputGroup.locator('input');
  }

  private getTextareaByExactLabel(form: Locator, label: string): Locator {
    const inputGroup = form.locator('.oxd-input-group').filter({
      has: this.page.locator('.oxd-label').filter({
        hasText: new RegExp(`^${this.escapeRegExp(label)}\\*?$`)
      })
    });

    return inputGroup.locator('textarea');
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}