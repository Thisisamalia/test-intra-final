const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

let browser, page;

Given('je suis sur la page de gestion des contacts', async () => {
    browser = await chromium.launch({ headless: true }); // mettre TRUE pour git action pour pas ouvrir chronium
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

When('je remplis le formulaire avec des données valides', async () => {
    await page.fill('#nom', 'Jean');
    await page.fill('#prenom', 'Dupont');
    await page.fill('#telephone', '4381112222');
    await page.fill('#email', 'jean.dupont@gmail.com');
});

When('je clique sur "Ajouter"', async () => {
    await page.click('button[type="submit"]');
});



Then('je vois le nouveau contact dans la liste', async () => {
    await page.waitForSelector('text=Jean Dupont');
    const contactText = await page.textContent('table');
    expect(contactText).toContain('Jean');
    expect(contactText).toContain('Dupont');
});

Given('un contact existe dans la liste', async () => {
    const contactExiste = await page.$('table tr');
    if (!contactExiste) {
        await page.fill('#nom', 'Test');
        await page.fill('#prenom', 'Contact');
        await page.fill('#telephone', '1234567890');
        await page.fill('#email', 'test.contact@gmail.com');
        await page.click('button[type="submit"]');
        await page.waitForSelector('text=Test Contact');
    }
});

When('je sélectionne un contact et clique sur "Modifier"', async () => {
    await page.click('button.modify'); // Assurez-vous que ce sélecteur correspond à ton bouton Modifier
});

When('je change les informations du contact', async () => {
    await page.fill('#nom', 'Jean');
    await page.fill('#prenom', 'Durand');
});

When('je valide la modification', async () => {
    await page.click('#updateButton'); // Vérifie que c'est bien l'ID de ton bouton Modifier
});

Then('le contact est mis à jour dans la liste', async () => {
    await page.waitForSelector('text=Jean Durand');
    const contactText = await page.textContent('table');
    expect(contactText).toContain('Jean');
    expect(contactText).toContain('Durand');
});

When('je clique sur "Supprimer"', async () => {
    await page.click('button.delete'); // Vérifie que ce sélecteur correspond bien à ton bouton Supprimer
});

When('je confirme la suppression', async () => {
    await page.evaluate(() => confirm("Êtes-vous sûr de vouloir supprimer ce contact ?"));
});



Then('le contact n\'apparaît plus dans la liste', async () => {
    await page.waitForTimeout(1000);
    const contactText = await page.textContent('table');
    expect(contactText).not.toContain('Jean Durand');
    await browser.close();
});
