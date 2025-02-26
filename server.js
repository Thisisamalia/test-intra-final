const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'src', 'contacts.json');

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));

// Lire le fichier JSON des contacts
function readContactsFile() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify({ lastId: 0, contacts: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
}

// Écrire dans le fichier JSON
function writeContactsFile(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

//  ROUTE : Récupérer tous les contacts
app.get('/contacts', (req, res) => {
    const data = readContactsFile();
    res.json(data.contacts);
});

//  ROUTE : Récupérer un contact par ID
app.get('/contacts/:id', (req, res) => {
    const data = readContactsFile();
    const contactId = parseInt(req.params.id);
    const contact = data.contacts.find(c => c.id === contactId);

    if (!contact) {
        return res.status(404).json({ message: "Contact non trouvé" });
    }

    res.json(contact);
});

//  ROUTE : Ajouter un contact
app.post('/contacts', (req, res) => {
    const data = readContactsFile();
    const { nom, prenom, telephone, email } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !prenom || !telephone || !email) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    // Création d'un ID unique
    const newContact = {
        id: data.lastId + 1,
        nom,
        prenom,
        telephone,
        email
    };

    // Ajout au fichier JSON
    data.contacts.push(newContact);
    data.lastId += 1;
    writeContactsFile(data);

    res.status(201).json(newContact);
});

//  ROUTE : Mettre à jour un contact
app.put('/contacts/:id', (req, res) => {
    const data = readContactsFile();
    const contactId = parseInt(req.params.id);
    const { nom, prenom, telephone, email } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !prenom || !telephone || !email) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    console.log(`🔄 Mise à jour du contact ID ${contactId} avec les données :`, req.body);

    const index = data.contacts.findIndex(c => c.id === contactId);
    if (index === -1) {
        return res.status(404).json({ message: "Contact non trouvé" });
    }

    // Mise à jour des données
    data.contacts[index] = { id: contactId, nom, prenom, telephone, email };
    writeContactsFile(data);

    res.json(data.contacts[index]);
});

//  ROUTE : Supprimer un contact
app.delete('/contacts/:id', (req, res) => {
    const data = readContactsFile();
    const contactId = parseInt(req.params.id);

    const newContacts = data.contacts.filter(c => c.id !== contactId);

    if (data.contacts.length === newContacts.length) {
        return res.status(404).json({ message: "Contact non trouvé" });
    }

    data.contacts = newContacts;
    writeContactsFile(data);

    res.json({ message: "Contact supprimé avec succès" });
});

//  ROUTE : Servir `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// 🚀 Lancer le serveur
app.listen(PORT, () => console.log(` Serveur lancé sur http://localhost:${PORT}`));

module.exports = { app };
