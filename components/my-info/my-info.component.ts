import { Page, expect } from '@playwright/test';
import { FormUtil } from '../../utils/form.util';

export class MyInfoComponent {
  constructor(private readonly page: Page) {}

  async navigateToMyInfo() {
    await this.page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/dashboard\/index/);

    const myInfoLink = this.page.getByRole('link', {
      name: 'My Info',
      exact: true
    });

    await expect(myInfoLink).toBeVisible();
    await myInfoLink.click();

    await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Personal Details',
        exact: true
      })
    ).toBeVisible();
  }

  async navigateToPersonalDetails() {
    await this.clickMyInfoTab('Personal Details');

    await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Personal Details',
        exact: true
      })
    ).toBeVisible();
  }

  async navigateToContactDetails() {
    await this.clickMyInfoTab('Contact Details');

    await this.page.waitForURL(/\/pim\/contactDetails\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/contactDetails\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Contact Details',
        exact: true
      })
    ).toBeVisible();
  }

  async navigateToEmergencyContacts() {
    await this.clickMyInfoTab('Emergency Contacts');

    await this.page.waitForURL(/\/pim\/viewEmergencyContacts\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewEmergencyContacts\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Assigned Emergency Contacts',
        exact: true
      })
    ).toBeVisible();
  }

  async navigateToDependents() {
    await this.clickMyInfoTab('Dependents');

    await this.page.waitForURL(/\/pim\/viewDependents\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewDependents\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Assigned Dependents',
        exact: true
      })
    ).toBeVisible();
  }

  async navigateToQualifications() {
    await this.clickMyInfoTab('Qualifications');

    await this.page.waitForURL(/\/pim\/viewQualifications\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewQualifications\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: 'Qualifications',
        exact: true
      }).first()
    ).toBeVisible();
  }

  async navigateToMemberships() {
    await this.clickMyInfoTab('Memberships');

    await this.page.waitForURL(/\/pim\/viewMemberships\/empNumber\/\d+/, {
      timeout: 30000
    });

    await FormUtil.waitForLoader(this.page);

    await expect(this.page).toHaveURL(/\/pim\/viewMemberships\/empNumber\/\d+/);

    await expect(
      this.page.getByRole('heading', {
        name: /Memberships/i
      }).first()
    ).toBeVisible();
  }

  private async clickMyInfoTab(tabName: string) {
    const tabLink = this.page.getByRole('link', {
      name: tabName,
      exact: true
    });

    await expect(tabLink).toBeVisible();
    await tabLink.click();
  }
}