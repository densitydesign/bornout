// Dependencies

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

// Schema

var ChapterSchema = new Schema({
  
	title : { type : 'String', default : 'Untitled' },
    description : { type : 'String', default : '' },
    section: { type : Schema.ObjectId, ref : 'Section' },
    protocol : { type : 'String', default : 'link' }

})

// Methods

ChapterSchema.methods = {

}

// Statics

ChapterSchema.statics = {

}

// Create the model
mongoose.model('Chapter', ChapterSchema)