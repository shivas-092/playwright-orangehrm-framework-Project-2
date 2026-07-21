export class MyInfoData {
  private static readonly uniqueId = Date.now().toString().slice(-6);

  static readonly personalDetails = {
    middleName: `Auto${this.uniqueId}`,
    otherId: `OID${this.uniqueId}`,
    driverLicenseNumber: `DL${this.uniqueId}`
  };

  static readonly contactDetails = {
    street1: `Automation Street ${this.uniqueId}`,
    street2: `QA Colony ${this.uniqueId}`,
    city: 'Hyderabad',
    stateProvince: 'Telangana',
    zipPostalCode: '500081',
    country: 'India',
    homeTelephone: `040${this.uniqueId}`,
    mobileTelephone: `9${this.uniqueId}123`,
    workTelephone: `080${this.uniqueId}`,
    otherEmail: `automation${this.uniqueId}@example.com`
  };

  static readonly emergencyContact = {
    name: `Emergency Contact ${this.uniqueId}`,
    relationship: 'Brother',
    homeTelephone: `040${this.uniqueId}`,
    mobileTelephone: `9${this.uniqueId}456`,
    workTelephone: `080${this.uniqueId}`
  };

  static readonly dependent = {
    name: `Automation Child ${this.uniqueId}`,
    relationship: 'Child'
  };

  static readonly workExperience = {
    company: `Automation Company ${this.uniqueId}`,
    jobTitle: 'QA Automation Engineer',
    comment: `Work experience created through Playwright ${this.uniqueId}`
  };

  static readonly membership = {
    membership: 'ACCA',
    subscriptionPaidBy: 'Company',
    subscriptionAmount: '10000',
    currency: 'Indian Rupee'
  };
}