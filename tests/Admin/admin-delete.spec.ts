import { test } from '@playwright/test';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { PIMComponent } from '../../components/pim/pim.component';
import { AdminComponent } from '../../components/admin/admin.component';
import { EmployeeData } from '../../test-data/employee.data';
import { AdminData } from '../../test-data/admin.data';

test.describe('Admin Module - Delete User', () => {
  test('Admin user can delete existing system user', async ({ page }) => {
    const sidebar = new SidebarComponent(page);
    const pimComponent = new PIMComponent(page);
    const adminComponent = new AdminComponent(page);

    const employee = EmployeeData.createEmployee();

    await sidebar.navigateToPIM();
    await pimComponent.clickAddEmployee();

    const createdEmployee = await pimComponent.addEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });

    const employeeFullName = `${createdEmployee.firstName} ${createdEmployee.lastName}`;
    const adminUser = AdminData.createAdminUser(employeeFullName);

    await adminComponent.navigateToAdmin();
    await adminComponent.addUser(adminUser);

    await adminComponent.searchUser(adminUser.username);
    await adminComponent.verifySearchResult(adminUser.username);

    await adminComponent.deleteUser(adminUser.username);
    await adminComponent.verifyUserDeleted(adminUser.username);
  });
});