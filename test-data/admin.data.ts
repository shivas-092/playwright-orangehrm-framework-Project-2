// test-data/admin.data.ts
import { faker } from '@faker-js/faker';

export interface AdminUserData {
  employeeName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'ESS';
  status: 'Enabled' | 'Disabled';
}

export class AdminData {
  static createAdminUser(employeeName: string): AdminUserData {
    const password = 'Admin@12345';

    return {
      employeeName,
      username: `auto_admin_${faker.number.int({ min: 10000, max: 99999 })}`,
      password,
      confirmPassword: password,
      role: 'Admin',
      status: 'Enabled',
    };
  }
}