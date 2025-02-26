const { deleteContact } = require('../../src/contacts');

describe("Test de la fonction deleteContact", () => {
    let contacts = [];

    beforeEach(() => {
        contacts = [
            { id: 1, nom: "Alice", prenom: "Martin", telephone: "4385314156", email: "alice@gmail.com" },
            { id: 2, nom: "Bob", prenom: "Dupont", telephone: "4382223333", email: "bob@gmail.com" }
        ];
    });

    test("supprime un contact existant", () => {
        const updatedContacts = deleteContact(contacts, 1);

        expect(updatedContacts).toHaveLength(1);
        expect(updatedContacts.find(c => c.id === 1)).toBeUndefined();
    });
});
