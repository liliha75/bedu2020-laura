const low = require('lowdb')
const lodashId = require('lodash-id')

// Set up lowdb database
const FileSync = require('lowdb/adapters/FileSync')
const { sumBy } = require('lodash')
const adapter = new FileSync('db.json')
const db = low(adapter)

// This will auto-generate the ids
db._.mixin(lodashId)

// Seed data
const seed = [
  { name: 'Bingo', type: 'dog', age: 2, id: lodashId.createId() },
  { name: 'Micifu', type: 'cat', age: 1, id: lodashId.createId() }
]
db.defaults({ pets: seed }).write()

// CRUD (plus list) methods
const pets = {
  
  getAll: () => {
    console.log('GET ALL')
    return db.get('pets').value()
  },

  get: (id) => {
    return db.get('pets').find({ id }).value()
  },

  create: (attrs) => {
    const id = lodashId.createId()
    db.get('pets').push({
      name: attrs.name,
      type: attrs.type,
      age: attrs.age,
      id
    }).write()
    return pets.get(id)
  },

  update: (id, attrs) => {
    const pet = db.get('pets').find({ id })
    pet.assign({
      name: attrs.name,
      age: attrs.age
    }).write()
    return pet.value()
  },

  destroy: (id) => {
    return db.get('pets').remove({ id }).write()
  }
}

module.exports = pets