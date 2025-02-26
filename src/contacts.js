// Ajouter un contact
function addContact(contacts, newContact) {
    const id = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const contact = { id, ...newContact };
    return [...contacts, contact]; 
}

// Modifier un contact
function updateContact(contacts, id, updatedData) {
    return contacts.map(contact => contact.id === id ? { ...contact, ...updatedData } : contact);
}

// Supprimer un contact
function deleteContact(contacts, id) {
    return contacts.filter(contact => contact.id !== id);
}

// Valider un contact
function validateContact(contact) {
    if (!contact.nom || !contact.prenom || !contact.telephone || !contact.email) return false;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(contact.email);
}

module.exports = { addContact, updateContact, deleteContact, validateContact };
