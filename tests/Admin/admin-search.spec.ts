// tests/Admin/admin-search.spec.ts

import { test } from '@playwright/test';
import { AdminComponent } from '../../components/admin/admin.component';

test.describe('Admin Module - Search User', () => {
  test('Admin user can search existing system user', async ({ page }) => {
    const adminComponent = new AdminComponent(page);

    await adminComponent.navigateToAdmin();

    await adminComponent.searchUser('Admin');
    await adminComponent.verifySearchResult('Admin');
  });
});