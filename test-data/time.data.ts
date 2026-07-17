export class TimeData {
  static createTimeData() {
    const uniqueId = Date.now().toString().slice(-6);

    return {
      customerName: `Automation Customer ${uniqueId}`,
      customerDescription: `Customer created during Time Module automation ${uniqueId}`,
      projectName: `Automation Project ${uniqueId}`,
      projectDescription: `Project created during Time Module automation ${uniqueId}`,
      updatedProjectName: `Updated Automation Project ${uniqueId}`,
      updatedProjectDescription: `Project updated during Time Module automation ${uniqueId}`,
      projectActivity: `QA Testing ${uniqueId}`,
    
    };
  }
}