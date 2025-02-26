import { test, expect, chromium } from '@playwright/test';

test.describe("Modification d'un contact avec Chromium", () => {
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

    test('Modifier un contact existant', async () => {
        // Sélectionner et cliquer sur "Modifier"
        await page.waitForSelector('button.modify');
        await page.click('button.modify');

        // Attendre que le bouton "Modifier" devienne actif
        await page.waitForFunction(() => {
            const button = document.querySelector('#updateButton');
            return button && !button.disabled && getComputedStyle(button).display !== 'none';
        }, { timeout: 5000 });

        // Modifier les champs du formulaire
        await page.fill('#nom', 'Jean');
        await page.fill('#prenom', 'Durand');

        // Cliquer sur "Modifier"
        await page.click('#updateButton');

        // Attendre que les informations dans le tableau se mettent à jour
        await page.waitForFunction(() => {
            const table = document.querySelector('table').textContent;
            return table.includes('Jean') && table.includes('Durand');
        }, { timeout: 5000 });

        // Vérifier que les nouvelles valeurs sont bien dans le tableau
        const contactTable = await page.locator('table').textContent();
        expect(contactTable).toContain('Jean');
        expect(contactTable).toContain('Durand');
    });
});
