export class EmployeeUtil {
  static generateEmployee() {
    const random = Date.now().toString().slice(-6);

    return {
      firstName: `Shiva${random}`,
      lastName: 'Tester',
      username: `user${random}`,
      password: 'Password@123',
    };
  }
}