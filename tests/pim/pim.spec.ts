import { test } from '@playwright/test';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { PIMComponent } from '../../components/pim/pim.component';
import { EmployeeUtil } from '../../utils/employee.util';

test.describe('PIM Module', () => {
  test('Admin can add employee with login details, edit, search and delete employee', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');

    const sidebar = new SidebarComponent(page);
    const pim = new PIMComponent(page);
    const employeeData = EmployeeUtil.generateEmployee();

    await sidebar.verifySidebarVisible();
    await sidebar.navigateToPIM();

    await pim.clickAddEmployee();

    const employee = await pim.addEmployee({
      ...employeeData,
      createLogin: true,
    });

    await pim.searchEmployee(employee.employeeId);
    await pim.verifyEmployeeExists(employee.employeeId);
    await pim.openEmployeeFromSearchResult(employee.employeeId);
    await pim.selectGender('Male');
    await pim.searchEmployee(employee.employeeId);
    await pim.verifyEmployeeExists(employee.employeeId);
    await pim.deleteEmployee(employee.employeeId);
    await pim.verifyEmployeeDeleted(employee.employeeId);
  });
});