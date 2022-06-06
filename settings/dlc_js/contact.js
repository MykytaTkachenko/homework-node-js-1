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

    const tempMass = temporaryValue.map(user => user.id);
    const tempMaxNum = Math.max(...tempMass);
    const tempIdNum = tempMaxNum + 1;
    const tempIdString = tempIdNum.toString();

    const userObj = {
        id: tempIdString,
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
    console.log(chooseID);
    if (chooseID.id === contactId) {
        const tempIndex = contactId - 1;
        console.log(tempIndex);
        temporaryValue.splice(tempIndex, 1);
        fs.writeFile(contactsPath, JSON.stringify(temporaryValue));
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}