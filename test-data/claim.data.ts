export class ClaimData {
  private static readonly uniqueId = Date.now().toString().slice(-6);

  static readonly employeeName = 'Wesley Souza';
  static readonly eventName = `Automation Event ${this.uniqueId}`;
  static readonly eventDescription = `Event created during Claim Module automation ${this.uniqueId}`;
  static readonly expenseTypeName = `Automation Expense ${this.uniqueId}`;
  static readonly expenseTypeDescription = `Expense type created during Claim Module automation ${this.uniqueId}`;
  static readonly currency = 'Indian Rupee';
  static readonly claimRemarks = `Sprint 9 Claim automation test ${this.uniqueId}`;
  static readonly expenseAmount = '1500';
  static readonly expenseNote = `Expense added during Claim Module automation ${this.uniqueId}`;
  static readonly expenseDate = this.getCurrentDate();
  static readonly expectedInitialStatus = 'Initiated';
  static readonly expectedSubmittedStatus = 'Paid';

  private static getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${day}-${month}`;
  }
}