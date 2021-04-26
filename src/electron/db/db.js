const path = require('path')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const dbPath = /** path.join(electronApp.getPath('userData'), 'Cache'); **/ './srv/db';

const zipperDB = PouchDB.defaults({
  prefix: path.join(dbPath, 'db/')
})('zipper');

const messageDB = PouchDB.defaults({
  prefix: path.join(dbPath, 'db/')
})('messages');

const chatDB = PouchDB.defaults({
  prefix: path.join(dbPath, 'db/')
})('chats');

const contactsDB = PouchDB.defaults({
  prefix: path.join(dbPath, 'db/')
})('contacts');


async function createIndexes() {
  try {
    await messageDB.createIndex({
      index: {
        fields: ['date', 'chatID']
      }
    })
    await messageDB.createIndex({
      index: {
        fields: ['isMedia', 'date', 'attachment.ext']
      }
    })
  } catch (error) {
    console.log(error);
  }
}

createIndexes().then(() => console.log('indexing done'))
  .catch(error => console.log(error))



module.exports = {
  zipperDB,
  messageDB,
  contactsDB,
  chatDB
}