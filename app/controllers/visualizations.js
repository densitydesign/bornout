// Dependencies

var mongoose = require('mongoose')
  , Visualization = mongoose.model('Visualization')
  , Chapter = mongoose.model('Chapter')
  , utils = require('../../lib/utils')
  , _ = require('underscore')


// Load

exports.load = function(req, res, next, slug) {
  Visualization.load(slug, function (err, vis) {
    if (err) return next(err)
    if (!vis) return next(new Error('not found'))
    req.visualization = vis

  	// retrieving next
  	var options = { criteria: { chapter : vis.chapter, index : { '$gt' : vis.index } } }
  	Visualization.list(options, function (err, nextvis) {
  		
  		req.nextPage=nextvis[0]

  		options = { criteria: { chapter : vis.chapter, index : { '$lt' : vis.index } } }
  		
  		Visualization.list(options, function (err, previs) {
  			console.log("PRE", previs)
	  		req.prevPage=previs[previs.length-1]
	  		next()
	  	})
  	})
  })
}


exports.new = function(req, res){
  res.render('visualizations/new', {
    title: 'New Visualization',
    visualization: new Visualization({}),
    section: req.section,
    chapter: req.chapter
  })
}

exports.edit = function (req, res) {
  res.render('visualizations/edit', {
    title: 'Edit ' + req.visualization.title,
    visualization: req.visualization,
    section: req.section,
    chapter: req.chapter
  })
}

// Index

exports.index = function(req, res) {

  Visualization.list({}, function (err, visualizations) {
    if (err) return res.render('500')
    Visualization.count().exec(function (err, count) {
      res.render('visualizations/index', {
        title: 'Visualizations',
        visualizations: visualizations
      })
    })
  })  
}

// Show one visualization

exports.show = function(req, res){
  res.render('visualizations/show', {
    title: req.visualization.title,
    visualization: req.visualization,
    section: req.section,
    chapter: req.chapter,
    prevPage: req.prevPage,
    nextPage: req.nextPage,
    prevChapter : req.prevChapter,
    nextChapter : req.nextChapter
  })
}

// Create a new visualization

exports.create = function (req, res) {
  var visualization = new Visualization(req.body)
	visualization.chapter = req.chapter

  visualization.uploadAndSave(function (err) {
    if (!err) {
      req.flash('success', 'Successfully created section!')
      return res.redirect('/sections/' + req.section.slug + '/chapters/' + req.chapter.slug + '/visualizations/'+visualization.slug)
    }

    res.render('visualizations/new', {
      title: 'New Visualization',
      visualization: visualization,
    	chapter: req.chapter,
    	section: req.section,
      errors: utils.errors(err.errors || err)
    })
  })
}

// Update

exports.update = function(req, res){
  var visualization = req.visualization
  visualization = _.extend(visualization, req.body)

  visualization.uploadAndSave(function (err) {
    if (!err) {
      return res.redirect('/sections/' + req.section.slug + '/chapters/' + req.chapter.slug + '/visualizations/' + visualization.slug)
    }

    res.render('visualizations/edit', {
      title: 'Edit visualization',
      visualization: visualization,
      chapter: req.chapter,
    	section: req.section,
      errors: utils.errors(err.errors || err)
    })
  })
}

// Delete

exports.destroy = function(req, res){
  var visualization = req.visualization
  visualization.remove(function(err){
    req.flash('info', 'Deleted successfully')
    res.redirect('/sections/' + req.section.slug + '/chapters/' + req.chapter.slug)
  })
}