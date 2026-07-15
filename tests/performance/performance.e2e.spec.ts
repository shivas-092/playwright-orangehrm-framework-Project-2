import { test } from '@playwright/test';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { KPIComponent } from '../../components/performance/kpi.component';
import { TrackerComponent } from '../../components/performance/tracker.component';
import { PerformanceData } from '../../test-data/performance.data';
import { TrackerData } from '../../test-data/tracker.data';

test.describe('Performance Module', () => {
  test('Admin can create, search, edit and delete a KPI', async ({ page }) => {
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
    const trackerComponent = new TrackerComponent(page);
    const tracker = TrackerData.createTracker();

    await trackerComponent.navigateToTrackers();
    await trackerComponent.clickAddTracker();
    await trackerComponent.createTracker(tracker);
    await trackerComponent.searchTracker(tracker.employeeName);
    await trackerComponent.verifyTrackerExists(tracker.trackerName);
  });
});