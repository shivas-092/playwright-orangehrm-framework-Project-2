import { test } from '@playwright/test';
import { EmployeeWorkflow } from '../../workflows/employee.workflow';
import { LoginComponent } from '../../components/auth/login.component';
import { LeaveComponent } from '../../components/leave/leave.component';
import { env } from '../../config/env';

test.describe('Leave Module - E2E Workflow', () => {
  test('Employee can apply, search, cancel and verify cancelled leave', async ({ page, browser }) => {
    test.setTimeout(120000);

    const workflow = new EmployeeWorkflow(page);
    const employee = await workflow.createEmployeeWithLeaveEntitlement();

    const employeeContext = await browser.newContext({
      baseURL: env.baseUrl,
      storageState: {
        cookies: [],
        origins: [],
      },
    });

    try {
      const employeePage = await employeeContext.newPage();
      const employeeLogin = new LoginComponent(employeePage);
      const employeeLeave = new LeaveComponent(employeePage);

      await employeePage.goto('/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
      await employeeLogin.login(employee.username!, employee.password!);
      await employeeLeave.navigateToApplyLeave();
      await employeeLeave.applyOneDayLeave('Leave applied using Playwright automation');
      await employeeLeave.navigateToMyLeave();
      await employeeLeave.searchMyLeave();
      await employeeLeave.verifyAppliedLeaveExists();
      await employeeLeave.cancelAppliedLeave();
      await employeeLeave.searchMyLeave();
      await employeeLeave.verifyLeaveCancelled();
    } finally {
      await employeeContext.close();
    }
  });
});