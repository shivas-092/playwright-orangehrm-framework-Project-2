import { Page, expect } from '@playwright/test';

export class PIMComponent {
  constructor(private readonly page: Page) {}

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await expect(this.page).toHaveURL(/addEmployee/);

    await expect(
      this.page.getByRole('heading', { name: 'Add Employee' })
    ).toBeVisible();
  }
   

   async addEmployee(firstName: string, lastName: string) {
      const employeeId = Date.now().toString().slice(-6);

  await this.page.getByPlaceholder('First Name').fill(firstName);
  await this.page.getByPlaceholder('Last Name').fill(lastName);

  const employeeIdInput = this.page.locator(
    '//label[text()="Employee Id"]/../following-sibling::div//input'
  );

  await employeeIdInput.fill(employeeId);
   

    await this.page.getByRole('button', { name: 'Save' }).click();

    await expect(this.page).toHaveURL(/viewPersonalDetails/);
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    
    return {
    firstName,
    lastName,
    employeeId
  };
  }
  async searchEmployeeById(employeeId: string) { //employee id search
  await this.page.getByRole('link', { name: 'Employee List' }).click();

  await expect(this.page).toHaveURL(/viewEmployeeList/);

  const employeeIdInput =  this.page.locator(
  '//label[text()="Employee Id"]/../following-sibling::div//input'
);
  await employeeIdInput.fill(employeeId);
  await this.page.getByRole('button', { name: 'Search' }).click();
  await expect(this.page.getByText(employeeId)).toBeVisible();
  }


async openEmployeeFromSearchResult(employeeId: string) {
    
  await this.page.getByText(employeeId).click();
 

  await expect(this.page).toHaveURL(/viewPersonalDetails/);
  await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
}

async Genderselection (gender: 'Male' | 'Female') {
  await this.page.locator("//label[normalize-space()='Male']").click()


  await this.page.locator('form').first().getByRole('button', { name: 'Save' }).click();


}

async navigateToEmployeeList() {
  await this.page.getByRole('link', { name: 'Employee List' }).click();

  await expect(this.page).toHaveURL(/viewEmployeeList/);
}



}
