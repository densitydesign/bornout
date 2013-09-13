// Dependencies

var mongoose = require('mongoose')
  , Chapter = mongoose.model('Chapter')
  , Visualization = mongoose.model('Visualization')
  , utils = require('../../lib/utils')
  , _ = require('underscore')


// Load

exports.load = function(req, res, next, slug) {
  Chapter.load(slug, function (err, chapter) {
    if (err) return next(err)
    if (!chapter) return next(new Error('not found'))
    req.chapter = chapter

    // loading visualizations... maybe move this into models
    var options = { criteria: { chapter: chapter } }
    Visualization.list(options, function (err, visualizations){
      if (err) return next(err);
      console.log(visualizations)
      req.visualizations = visualizations;
      next()
    })
  })
}


exports.new = function(req, res){
  res.render('chapters/new', {
    title: 'New chapter',
    section: req.section,
    chapter: new Chapter({})
  })
}

exports.edit = function (req, res) {
  res.render('chapters/edit', {
    title: 'Edit ' + req.chapter.title,
    chapter: req.chapter,
    section: req.section
  })
}

// Index

exports.index = function(req, res) {

  Chapter.list({}, function (err, chapters) {
    if (err) return res.render('500')
    Chapter.count().exec(function (err, count) {
      res.render('chapters/index', {
        title: 'chapters',
        chapters: chapters
      })
    })
  })  
}

// Show one chapter

exports.show = function(req, res){
  res.render('chapters/show', {
    title: req.chapter.title,
    chapter: req.chapter,
    section: req.section,
    visualizations: req.visualizations
  })
}

// Create a new chapter

exports.create = function (req, res) {
  var chapter = new Chapter(req.body)
  chapter.section = req.section

  chapter.uploadAndSave(function (err) {
    if (!err) {
      req.flash('success', 'Successfully created section!')
      return res.redirect('/sections/' + req.section.slug + '/chapters/' + chapter.slug)
    }

    res.render('chapters/new', {
      title: 'New chapter',
      chapter: chapter,
      errors: utils.errors(err.errors || err)
    })
  })
}

// Update

exports.update = function(req, res){
  var chapter = req.chapter
  chapter = _.extend(chapter, req.body)

  chapter.uploadAndSave(function (err) {
    if (!err) {
      return res.redirect('/sections/' + req.section.slug + '/chapters/' + chapter.slug)
    }

    res.render('chapters/edit', {
      title: 'Edit chapter',
      chapter: chapter,
      errors: utils.errors(err.errors || err)
    })
  })
}

// Delete

exports.destroy = function(req, res){
  var chapter = req.chapter
  chapter.remove(function(err){
    req.flash('info', 'Deleted successfully')
    res.redirect('/sections/' + req.section.slug)
  })
}