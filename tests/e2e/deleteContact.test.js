import { test, expect, chromium } from '@playwright/test';

test.describe("Suppression d'un contact avec Chromium", () => {
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

    test('Supprimer un contact', async () => {
        // Accepter la boîte de dialogue de confirmation
        page.on('dialog', dialog => dialog.accept());

        // Sélectionner le premier bouton "Supprimer" trouvé dans la table
        await page.waitForSelector('button.delete');
        await page.click('button.delete');

        // Attendre la suppression en vérifiant que la table a changé
        await page.waitForTimeout(2000); // Permet à l'interface de se mettre à jour

        // Vérifier que le contact n'est plus dans la liste
        const contactTable = await page.locator('table').textContent();
        expect(contactTable).not.toContain('Jean');
        expect(contactTable).not.toContain('Dupont');
    });
});
