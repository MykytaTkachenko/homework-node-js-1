const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(process.cwd(), 'dataBase/contact.json');

async function listContacts() {
    return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
    const temporaryValue = await listContacts();
    return temporaryValue.find(contactUnit => contactUnit.id === contactId);
}
  
async function addContact(name, email, phone) {
    const temporaryValue = await listContacts();

    const userObj = {
        id: nanoid(),
        name,
        email,
        phone,
    }

    temporaryValue.push(userObj);
    fs.writeFile(contactsPath, JSON.stringify(temporaryValue));
    console.log(userObj);
}

async function removeContact(contactId) {
    const temporaryValue = await listContacts();
    const chooseID = await getContactById(contactId);
    console.log(contactId);
    console.log(chooseID);
    if (chooseID.id === contactId) {
        const newMassOfCon = temporaryValue.filter(user => user.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(newMassOfCon));
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}