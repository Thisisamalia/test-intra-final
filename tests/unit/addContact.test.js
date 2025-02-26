const { addContact } = require('../../src/contacts');

describe("Test de la fonction addContact", () => {
    let contacts = [];

    beforeEach(() => {
        contacts = [
            { id: 1, nom: "Alice", prenom: "Martin", telephone: "4385314156", email: "alice@gmail.com" }
        ];
    });

    test("ajoute un nouveau contact", () => {
        const newContact = { nom: "Jean", prenom: "Dupont", telephone: "4381112222", email: "jean.dupont@gmail.com" };
        const updatedContacts = addContact(contacts, newContact);

        expect(updatedContacts).toHaveLength(2);
        expect(updatedContacts[1]).toMatchObject(newContact);
    });
});
