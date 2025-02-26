const { updateContact } = require('../../src/contacts');

describe("Test de la fonction updateContact", () => {
    let contacts = [];

    beforeEach(() => {
        contacts = [
            { id: 1, nom: "Alice", prenom: "Martin", telephone: "4385314156", email: "alice@gmail.com" },
            { id: 2, nom: "Bob", prenom: "Dupont", telephone: "4382223333", email: "bob@gmail.com" }
        ];
    });

    test("met à jour un contact existant", () => {
        const updatedData = { nom: "Bob", prenom: "Smith", telephone: "4382223333", email: "bob@gmail.com" };
        const updatedContacts = updateContact(contacts, 2, updatedData);

        expect(updatedContacts[1].prenom).toBe("Smith");
    });
});
