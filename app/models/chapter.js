// Dependencies

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , utils = require('../../lib/utils')

// Schema

var ChapterSchema = new Schema({
	title : { type : 'String', default : '' },
	slug : { type : String, default : '' },
  description : { type : 'String', default : '' },
  section: { type : Schema.ObjectId, ref : 'Section' },
  protocol : { type : 'String', default : 'link' }
})

// Create the slug from the title

ChapterSchema.path('title').set(function (title) {
  this.slug = slugify(title);
  return title;
});

function slugify (title) {
  return utils.removeDiacritics((title || '')).replace(/[^a-z0-9]/gi, '-').toLowerCase();
}


// Methods

ChapterSchema.methods = {
	uploadAndSave: function (cb) {
    this.save(cb);
  }
}

// Statics

ChapterSchema.statics = {

	load: function (slug, cb) {
    this.findOne({ slug : slug })
      //.populate('user', 'name email username')
      //.populate('comments.user')
      .exec(cb)
  },

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .exec(cb)
  }
}

// Create the model
mongoose.model('Chapter', ChapterSchema)