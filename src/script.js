const API_URL = "http://localhost:3000/contacts";
let contactIdToUpdate = null; // Stocker l'ID du contact à modifier

//  Charger les contacts au démarrage
async function loadContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur de récupération des contacts");

        const contacts = await response.json();
        updateContactList(contacts);
    } catch (error) {
        console.error("Erreur lors du chargement des contacts :", error);
    }
}

//  Mettre à jour le tableau HTML
function updateContactList(contacts) {
    const tbody = document.getElementById("contact-list");
    tbody.innerHTML = "";

    contacts.forEach(contact => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.prenom}</td>
            <td>${contact.telephone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="modify" onclick="editContact(${contact.id})">Modifier</button>
                <button class="delete" onclick="deleteContact(${contact.id})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

//  Vider les champs du formulaire
function resetForm() {
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("email").value = "";
    contactIdToUpdate = null;

    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
}

//  Ajouter un contact
async function addContact(contact) {
    if (!validateContact(contact)) {
        alert("Erreur : Vérifiez les champs du formulaire !");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout du contact");

        await response.json();
        loadContacts();
        resetForm();
    } catch (error) {
        console.error(error);
    }
}

//  Modifier un contact (pré-remplir les champs)
async function editContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération du contact");

        const contact = await response.json();

        document.getElementById("nom").value = contact.nom;
        document.getElementById("prenom").value = contact.prenom;
        document.getElementById("telephone").value = contact.telephone;
        document.getElementById("email").value = contact.email;
        contactIdToUpdate = id;

        document.getElementById("addButton").style.display = "none";
        document.getElementById("updateButton").style.display = "inline-block";
    } catch (error) {
        console.error(error);
    }
}

//  Mettre à jour un contact
async function updateContact() {
    if (!contactIdToUpdate) return;

    const contact = {
        nom: document.getElementById("nom").value.trim(),
        prenom: document.getElementById("prenom").value.trim(),
        telephone: document.getElementById("telephone").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    if (!validateContact(contact)) {
        alert("Erreur : Vérifiez les champs du formulaire !");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${contactIdToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });

        if (!response.ok) throw new Error("Erreur lors de la mise à jour du contact");

        await response.json();
        loadContacts();
        resetForm();
    } catch (error) {
        console.error(error);
    }
}

//  Supprimer un contact
async function deleteContact(id) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression du contact");

        await response.json();
        loadContacts();
    } catch (error) {
        console.error(error);
    }
}

//  Validation des contacts
function validateContact(contact) {
    if (!contact.nom || !contact.prenom || !contact.telephone || !contact.email) return false;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(contact.email);
}

//  Gestion du formulaire
document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (contactIdToUpdate) {
        await updateContact();
    } else {
        await addContact({
            nom: document.getElementById("nom").value.trim(),
            prenom: document.getElementById("prenom").value.trim(),
            telephone: document.getElementById("telephone").value.trim(),
            email: document.getElementById("email").value.trim()
        });
    }
});

document.getElementById("updateButton").addEventListener("click", updateContact);

// Charger les contacts au démarrage
document.addEventListener("DOMContentLoaded", loadContacts);

// Exporter les fonctions pour les tests Jest
if (typeof module !== "undefined") {
    module.exports = { addContact, updateContact, deleteContact, validateContact };
}
