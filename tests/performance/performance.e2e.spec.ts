import { test } from '@playwright/test';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { KPIComponent } from '../../components/performance/kpi.component';
import { TrackerComponent } from '../../components/performance/tracker.component';
import { EmployeeWorkflow } from '../../workflows/employee.workflow';
import { PerformanceData } from '../../test-data/performance.data';
import { TrackerData } from '../../test-data/tracker.data';

test.describe('Performance Module', () => {
  test('Admin can create, search, edit and delete a KPI', async ({ page }) => {
    test.setTimeout(120000);

    const sidebar = new SidebarComponent(page);
    const kpiComponent = new KPIComponent(page);
    const kpi = PerformanceData.createKPI();

    await sidebar.navigateToKPI();
    await kpiComponent.clickAddKPI();
    await kpiComponent.addKPI(kpi);
    await kpiComponent.searchKPI(kpi.jobTitle);
    await kpiComponent.verifyKPIExists(kpi.name);
    await kpiComponent.openKPIForEdit(kpi.name);
    await kpiComponent.editKPI(kpi.updatedName, kpi.updatedMinimumRating, kpi.updatedMaximumRating);
    await kpiComponent.searchKPI(kpi.jobTitle);
    await kpiComponent.verifyKPIExists(kpi.updatedName);
    await kpiComponent.deleteKPI(kpi.updatedName);
    await kpiComponent.verifyKPIDeleted(kpi.updatedName);
  });

  test('Admin can create and search a performance tracker', async ({ page }) => {
    test.setTimeout(180000);

    const employeeWorkflow = new EmployeeWorkflow(page);
    const trackerComponent = new TrackerComponent(page);

    const employee = await employeeWorkflow.createEmployee();
    const reviewer = await employeeWorkflow.createEmployee();

    const employeeName = `${employee.firstName} ${employee.lastName}`;
    const reviewerName = `${reviewer.firstName} ${reviewer.lastName}`;
    const tracker = TrackerData.createTracker(employeeName, reviewerName);

    await trackerComponent.navigateToTrackers();
    await trackerComponent.clickAddTracker();
    await trackerComponent.createTracker(tracker);
    await trackerComponent.searchTracker(tracker.employeeName);
    await trackerComponent.verifyTrackerExists(tracker.trackerName);
  });
});