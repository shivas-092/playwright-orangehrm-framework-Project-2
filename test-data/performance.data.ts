export class PerformanceData {
  static createKPI() {
    const uniqueId = Date.now().toString().slice(-6);

    return {
      name: `Automation Quality KPI ${uniqueId}`,
      updatedName: `Updated Automation KPI ${uniqueId}`,
      jobTitle: 'QA Engineer',
      minimumRating: '1',
      maximumRating: '5',
      updatedMinimumRating: '2',
      updatedMaximumRating: '10',
      makeDefaultScale: false,
    };
  }
}