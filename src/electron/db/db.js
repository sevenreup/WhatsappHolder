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

const ddoc = {
  _id: '_design/full_text_search',
  views: {
    by_name: {
      map: function (doc) {
        const regex = /[\s\.;]+/gi;
        ['name'].forEach(field => {
          if (doc[field]) {
            const words = doc[field].replaceAll(regex, ',').split(',')
            words.forEach(word => {
              word = word.trim();
              if (word.length) {
                emit(word.toLocaleLowerCase(), [field, word]);
              }
            });
          }

        })
      }.toString()
    }
  }
};

chatDB.put(ddoc).then(function () {
  // success!
}).catch(function (err) {
  console.log(err);
  // chatDB.remove('_design/full_text_search')
});

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
    await chatDB.createIndex({
      index: {
        fields: ['date']
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