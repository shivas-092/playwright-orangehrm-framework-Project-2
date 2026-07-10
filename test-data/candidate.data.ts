import { faker } from '@faker-js/faker';

export class CandidateData {
  static createCandidate() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contactNumber: faker.number.int({ min: 6000000000, max: 9999999999 }).toString(),
      keywords: 'Playwright, Automation, QA',
      notes: 'Candidate created from Playwright automation.',
    };
  }
}