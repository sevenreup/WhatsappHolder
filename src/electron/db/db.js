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

module.exports = {
  zipperDB,
  messageDB,
  contactsDB
}