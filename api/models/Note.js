const mongoose = require('mongoose')
const { model, Schema } = mongoose

const noteSchema = new Schema({
  content: String,
  important: Boolean,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id //
    delete returnedObject.__v // No muta la base de datos, muta lo que se devuelve
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
