/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Section = mongoose.model('Section')
  , Chapter = mongoose.model('Chapter')
  , _ = require('underscore')
  , utils = require('../../lib/utils')



/**
 * List items tagged with a tag
 */

exports.index = function (req, res) {

  var criteria = { }
  /*var perPage = 5
  //var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
  var options = {
    perPage: perPage,
    page: page,
    criteria: criteria
  }*/

  Section.list({}, function(err, sections) {
    if (err) return res.render('500')
    Section.count(criteria).exec(function (err, count) {
      res.render('sections/index', {
        title: 'Sections',
        sections: sections
      })
    })
  })
}

/**
 * Load
 */

exports.load = function(req, res, next, slug){
  Section.load(slug, function (err, section) {
    if (err) return next(err)
    if (!section) return next(new Error('not found'))
    req.section = section

    // loading chapters... maybe move this into models
    var options = { criteria: { section: section } }
    Chapter.list(options, function (err, chapters){
      if (err) return next(err);
      req.chapters = chapters;
      next()
    })

  })
}


exports.new = function(req, res){
  res.render('sections/new', {
    title: 'New Section',
    section: new Section({})
  })
}

/**
 * Show
 */

exports.show = function(req, res){
  res.render('sections/show', {
    title: req.section.title,
    section: req.section,
    chapters : req.chapters
  })
}

/**
 * Edit an article
 */

exports.edit = function (req, res) {
  res.render('sections/edit', {
    title: 'Edit ' + req.section.title,
    section: req.section
  })
}

/**
 * Create an article
 */

exports.create = function (req, res) {
  var section = new Section(req.body)

  section.uploadAndSave(function (err) {
    if (!err) {
      req.flash('success', 'Successfully created section!')
      return res.redirect('/sections/' + section.slug)
    }
    console.log(err)
    res.render('sections/new', {
      title: 'New Section',
      section: section,
      errors: utils.errors(err.errors || err)
    })
  })
}

/**
 * Update article
 */

exports.update = function(req, res){
  var section = req.section
  section = _.extend(section, req.body)

  section.uploadAndSave(function(err) {
    if (!err) {
      return res.redirect('/sections/' + section.slug)
    }

    res.render('sections/edit', {
      title: 'Edit Section',
      section: section,
      errors: err.errors
    })
  })
}


/**
 * Delete an article
 */

exports.destroy = function(req, res){
  var section = req.section
  section.remove(function(err){
    req.flash('info', 'Deleted successfully')
    res.redirect('/sections')
  })
}