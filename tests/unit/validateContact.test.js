const { validateContact } = require('../../src/contacts');

describe("Test de la fonction validateContact", () => {
    test("valide un contact correct", () => {
        const validContact = { nom: "Jean", prenom: "Dupont", telephone: "4381112222", email: "jean.dupont@gmail.com" };
        expect(validateContact(validContact)).toBe(true);
    });

    test("rejette un contact avec un email invalide", () => {
        const invalidContact = { nom: "Jean", prenom: "Dupont", telephone: "4381112222", email: "jeandupontgmail.com" };
        expect(validateContact(invalidContact)).toBe(false);
    });

    test("rejette un contact avec un champ manquant", () => {
        const invalidContact = { nom: "Jean", telephone: "4381112222", email: "jean.dupont@gmail.com" };
        expect(validateContact(invalidContact)).toBe(false);
    });
});
