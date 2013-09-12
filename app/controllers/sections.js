/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Section = mongoose.model('Section')
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

exports.load = function(req, res, next, id){

  Section.load(id, function (err, section) {
    if (err) return next(err)
    if (!section) return next(new Error('not found'))
    req.section = section
    next()
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
    section: req.section
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
      return res.redirect('/sections/'+section._id)
    }

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
      return res.redirect('/sections/' + section._id)
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