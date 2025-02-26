import { test, expect, chromium } from '@playwright/test';

test.describe("Suppression d'un contact avec Chromium", () => {
    let browser;
    let page;

    test.beforeEach(async () => {
        browser = await chromium.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    test.afterEach(async () => {
        await browser.close();
    });

    test('Supprimer un contact', async () => {
        // Accepter la boîte de dialogue de confirmation
        page.on('dialog', async dialog => {
            console.log(`Confirmation de suppression : ${dialog.message()}`);
            await dialog.accept();
        });

        // Sélectionner et cliquer sur "Supprimer"
        await page.waitForSelector('button.delete');
        await page.click('button.delete');

        // Attendre que la ligne disparaisse après suppression
        await page.waitForFunction(() => !document.querySelector('tr[data-contact="Jean Dupont"]'), {
            timeout: 5000
        });

        // Vérifier que le contact a bien disparu
        const contactTable = await page.locator('table').textContent();
        expect(contactTable).not.toContain('Jean');
        expect(contactTable).not.toContain('Dupont');
    });
});
