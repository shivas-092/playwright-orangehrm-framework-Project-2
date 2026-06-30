import { test, expect } from '@playwright/test';
import { LoginComponent } from '../../components/login.component';

test('Authenticate Admin User', async ({ page }) => {

    const login = new LoginComponent(page);

    await page.goto('/');

    await login.loginAsAdmin();

    await expect(page).toHaveURL(/index/);

    await page.context().storageState({
        path: 'storage/admin.json',
    });

});