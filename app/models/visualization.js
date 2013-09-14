// Dependencies

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , utils = require('../../lib/utils')
  , Schema = mongoose.Schema

// Schema

var VisualizationSchema = new Schema({
    title : { type : String, default : '' },
    slug : { type : String, default : '' },
    description : { type : String, default : '' },
    chapter : { type : Schema.ObjectId, ref : 'Chapter' },
    content : { type : String, default : '' },
    legend : { type : String, default : '' },
    zoom : { type : Boolean, default : true },
    createdAt : { type : Date, default : Date.now },
    index : { type : Number, default : 1 }
})

// Setters

// Custom setters


// Create the slug from the title

VisualizationSchema.path('title').set(function (title) {
  this.slug = slugify(title);
  return title;
});

function slugify (title) {
  return utils.removeDiacritics((title || '')).replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

// Validation

VisualizationSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Visualization title cannot be blank')

VisualizationSchema.path('title').validate(function (title) {
  return title.toLowerCase() != "new"
}, 'You cannot use "New" as a name for the visualization')

// Methods

VisualizationSchema.methods = {

	uploadAndSave: function (cb) {
    return this.save(cb);
  }

}

// Statics

VisualizationSchema.statics = {

	// Find visualization by slug

	load: function (slug, cb) {
    this.findOne({ slug : slug })
      .exec(cb)
  },

  // List the visualizations

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'index': 1}) // sort by date
      .exec(cb)
  }

}

// Create the model
mongoose.model('Visualization', VisualizationSchema)