import { test } from '@playwright/test';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';

test.describe('Dashboard', () => {
  test('Admin user can view dashboard and navigate to PIM', async ({ page }) => {
    const dashboard = new DashboardComponent(page);
    const sidebar = new SidebarComponent(page);

    await page.goto('/web/index.php/dashboard/index');

    await dashboard.verifyDashboardPage();
    await dashboard.verifyDashboardWidgets();

    await sidebar.verifySidebarVisible();
    await sidebar.navigateToPIM();
  });
});