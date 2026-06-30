import { test, expect } from '@playwright/test';
import { LoginComponent } from '../../components/auth/login.component';

test('Authenticate Admin User', async ({ page }) => {

    const login = new LoginComponent(page);

    // Navigate to the OrangeHRM login page
    await page.goto('/');

    // Login using credentials from .env
    await login.loginAsAdmin();

    // Verify successful login
    await expect(page).toHaveURL(/dashboard/);

    // Save authenticated session for reuse
    await page.context().storageState({
        path: 'storage/admin.json',
    });

});