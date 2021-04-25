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

const contactsDB = PouchDB.defaults({
  prefix: path.join(dbPath, 'db/')
})('contacts');

messageDB.createIndex({
    index: {
      fields: ['isMedia', 'date', 'attachment.ext']
    }
  })
  .then(() => console.log('indexing done'))
  .catch(error => console.log(error))



module.exports = {
  zipperDB,
  messageDB,
  contactsDB
}