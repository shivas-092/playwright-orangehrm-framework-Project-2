import { faker } from '@faker-js/faker';

export class VacancyData {
  static createVacancy() {
    return {
      vacancyName: `QA Engineer ${faker.number.int({ min: 1000, max: 9999 })}`,
      jobTitle: 'QA Engineer',
      description: 'Candidate should have 5 years experience.',
      hiringManager: 'Peter Mac Anderson',
      positions: '2',
    };
  }
}