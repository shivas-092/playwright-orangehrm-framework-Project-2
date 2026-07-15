export class TrackerData {
  static createTracker() {
    const uniqueId = Date.now().toString().slice(-6);

    return {
      trackerName: `Automation Performance Tracker ${uniqueId}`,
      employeeName: 'John M Anderson',
      reviewerName: 'John Doe',
    };
  }
}