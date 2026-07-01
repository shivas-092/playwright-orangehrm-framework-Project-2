import { test } from '@playwright/test';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { PIMComponent } from '../../components/PIM/pim.component';


test.describe('PIM Module', () => {
  test('Admin can navigate to PIM Employee List page', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');

    const sidebar = new SidebarComponent(page);
    const pim = new PIMComponent(page);

    await sidebar.verifySidebarVisible();
    await sidebar.navigateToPIM();
     await pim.clickAddEmployee();
     const employee = await pim.addEmployee('Shiva', 'Tester');
    await pim.searchEmployeeById(employee.employeeId);
     await pim.openEmployeeFromSearchResult(employee.employeeId);

     await pim.Genderselection('Male')
     await pim.searchEmployeeById(employee.employeeId);

    console.log(employee);
  });
});