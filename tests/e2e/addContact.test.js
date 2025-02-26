import { test, expect, chromium } from '@playwright/test';

test.describe("Ajout d'un contact avec Chromium", () => {
    let browser;
    let page;

    test.beforeEach(async () => {
        browser = await chromium.launch({ headless: false }); // mettre true pour git
        page = await browser.newPage();
        await page.goto('http://localhost:3000'); // Ouvrir l'application
    });

    test.afterEach(async () => {
        await browser.close();
    });

    test('Ajouter un contact', async () => {
        // Remplir le formulaire
        await page.fill('#nom', 'Jean');
        await page.fill('#prenom', 'Dupont');
        await page.fill('#telephone', '4381112222');
        await page.fill('#email', 'jean.dupont@gmail.com');

        // Cliquer sur le bouton "Ajouter"
        await page.click('button[type="submit"]');

        // Vérifier que le contact a bien été ajouté
        await expect(page.locator('table')).toContainText('Jean');
        await expect(page.locator('table')).toContainText('Dupont');
    });
});
