import { test } from '@playwright/test';
import { TimeComponent } from '../../components/time/time.component';
import { ProjectInfoComponent } from '../../components/time/project-info.component';
import { TimeData } from '../../test-data/time.data';

test.describe.serial('Time Module - Project Information', () => {
  test('Admin user can create and update project information', async ({ page }) => {
    const timeComponent = new TimeComponent(page);
    const projectInfoComponent = new ProjectInfoComponent(page);
    const timeData = TimeData.createTimeData();

    await test.step('Create and verify a customer', async () => {
      await timeComponent.navigateToCustomers();
      await projectInfoComponent.clickAddCustomer();
      await projectInfoComponent.createCustomer(timeData.customerName, timeData.customerDescription);
      await projectInfoComponent.verifyCustomerInTable(timeData.customerName);
    });

    await test.step('Create a project using the logged-in employee as Project Admin', async () => {
      await timeComponent.navigateToProjects();
      await projectInfoComponent.clickAddProject();
      await projectInfoComponent.createProject(timeData.customerName, timeData.projectName, timeData.projectDescription);
    });

    await test.step('Edit and verify the project', async () => {
      await projectInfoComponent.editProject(timeData.projectName, timeData.updatedProjectName, timeData.updatedProjectDescription);
      await projectInfoComponent.verifyUpdatedProjectInTable(timeData.customerName, timeData.updatedProjectName);
    });
  });
});