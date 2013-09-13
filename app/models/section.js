

// Module dependencies


var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , utils = require('../../lib/utils')



// Section Schema

var SectionSchema = new Schema({
  title: { type : String, default : '' },
  slug: { type : String, default : '' }
})

// Custom setters


// Create the slug from the title

SectionSchema.path('title').set(function (title) {
  this.slug = slugify(title);
  return title;
});

function slugify (title) {
  return utils.removeDiacritics((title || '')).replace(/[^a-z0-9]/gi, '-').toLowerCase();
}



/**
 * Validations
 */

SectionSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Section title cannot be blank')


/**
 * Methods
 */

SectionSchema.methods = {

  /**
   * Save section and upload image
   *
   * @param {Object} images
   * @param {Function} cb
   * @api private
   */

  uploadAndSave: function (cb) {
    this.save(cb);
  }

  /**
   * Add comment
   *
   * @param {User} user
   * @param {Object} comment
   * @param {Function} cb
   * @api private
   

  addComment: function (user, comment, cb) {
    var notify = require('../mailer/notify')

    this.comments.push({
      body: comment.body,
      user: user._id
    })

    notify.comment({
      article: this,
      currentUser: user,
      comment: comment.body
    })

    this.save(cb)
  }

}

/**
 * Statics
 */

}

SectionSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (slug, cb) {
    this.findOne({ slug : slug })
      //.populate('user', 'name email username')
      //.populate('comments.user')
      .exec(cb)
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      //.populate('user', 'name username')
      //.sort({'createdAt': -1}) // sort by date
      //.limit(options.perPage)
      //.skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Section', SectionSchema)
