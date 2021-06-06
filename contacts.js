const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath).then(JSON.parse).then(console.table);
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(JSON.parse)
    .then((data) => data.find((contact) => contact.id === Number(contactId)))
    .then(console.log)
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(JSON.parse)
    .then((data) => {
      const newData = data.filter(({ id }) => id !== Number(contactId));
      fs.writeFile(contactsPath, JSON.stringify(newData));
      if (JSON.stringify(newData) == JSON.stringify(data)) {
        console.log(`There is no such id in the database`);
      } else console.log(`Contact with ${contactId} id has been deleted`);
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  const id = Date.now();
  const newContact = { id, name, email, phone };
  (async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parcedData = JSON.parse(data);
    const updatedData = [...parcedData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedData));
  })();
  console.log(`Contact ${newContact.name} added`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
