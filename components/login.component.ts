import { Page, expect } from '@playwright/test';
import { env } from '../config/env';
export class LoginComponent {

    constructor(private readonly page: Page) {}

    async login(username: string, password: string) {

        await this.page.getByPlaceholder('Username').fill(username);

        await this.page.getByPlaceholder('Password').fill(password);

        await this.page.getByRole('button', { name: 'Login' }).click();

    }


    async loginAsAdmin() {
        await this.login(env.username, env.password);
    }

    async verifyLoginPage() {

        await expect(this.page).toHaveURL(/login/);

    }




}