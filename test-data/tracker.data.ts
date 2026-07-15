export class TrackerData {
  static createTracker(employeeName: string, reviewerName: string) {
    const uniqueId = Date.now().toString().slice(-6);

    return {
      trackerName: `Automation Performance Tracker ${uniqueId}`,
      employeeName,
      reviewerName,
    };
  }
}