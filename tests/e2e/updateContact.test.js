import { test, expect, chromium } from '@playwright/test';

test.describe("Modification d'un contact avec Chromium", () => {
    let browser;
    let page;

    test.beforeEach(async () => {
        browser = await chromium.launch({ headless: false });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    test.afterEach(async () => {
        await browser.close();
    });

    test('Modifier un contact existant', async () => {
        // Sélectionner le premier bouton "Modifier"
        await page.waitForSelector('button.modify');
        await page.click('button.modify');

        // Attendre que le formulaire soit affiché et que le bouton "Modifier" apparaisse
        await page.waitForSelector('#updateButton', { state: 'visible' });

        // Modifier les informations
        await page.fill('#nom', 'Jean');
        await page.fill('#prenom', 'Durand');

        // Cliquer sur le bouton "Modifier"
        await page.click('#updateButton');

        // Attendre la mise à jour de la table
        await page.waitForTimeout(2000);

        // Vérifier que le contact est mis à jour
        const contactTable = await page.locator('table').textContent();
        expect(contactTable).toContain('Jean');
        expect(contactTable).toContain('Durand');
    });
});
