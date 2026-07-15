import { Page, expect } from '@playwright/test';
import { SidebarComponent } from '../components/dashboard/sidebar.component';
import { PIMComponent } from '../components/pim/pim.component';
import { LeaveComponent } from '../components/leave/leave.component';
import { EmployeeUtil } from '../utils/employee.util';

export class EmployeeWorkflow {
  constructor(private readonly page: Page) {}

  async createEmployee(createLogin: boolean = false) {
    const sidebar = new SidebarComponent(this.page);
    const pim = new PIMComponent(this.page);
    const employeeData = EmployeeUtil.generateEmployee();

    await this.page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await sidebar.navigateToPIM();
    await pim.clickAddEmployee();

    const employee = await pim.addEmployee({
      ...employeeData,
      createLogin,
    });

    await pim.searchEmployee(employee.employeeId);
    await pim.verifyEmployeeExists(employee.employeeId);

    return employee;
  }

  async createEmployeeWithLeaveEntitlement() {
    const leave = new LeaveComponent(this.page);
    const employee = await this.createEmployee(true);
    const employeeName = `${employee.firstName} ${employee.lastName}`;

    await leave.navigateToAddEntitlement();
    await leave.addLeaveEntitlement(employeeName);

    return employee;
  }
}