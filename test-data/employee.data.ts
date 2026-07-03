// test-data/employee.data.ts
import { faker } from '@faker-js/faker';

export interface EmployeeDataType {
  firstName: string;
  lastName: string;
  employeeId: string;
}

export class EmployeeData {
  static createEmployee(): EmployeeDataType {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
    };
  }
}