/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , sections = require('../app/controllers/sections')
  , chapters = require('../app/controllers/chapters')
  , visualizations = require('../app/controllers/visualizations')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config')[env]
  , express = require('express')
  //, auth = require('./middlewares/authorization')

var auth = express.basicAuth(config.user, config.password)


/**
 * Route middlewares
 */

// Authenticator


//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

var auth = express.basicAuth(config.username, config.password)


/**
 * Expose routes
 */

module.exports = function (app, passport) {


  /* user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  app.get('/users/:userId', users.show)
  app.param('userId', users.user)
  */

  // section routes

  app.get('/sections', auth, sections.index)
  app.get('/sections/new', auth, sections.new)
  app.post('/sections', auth, sections.create)
  app.get('/sections/:sectionSlug', auth, sections.show)
  app.get('/sections/:sectionSlug/edit', auth, sections.edit)
  app.put('/sections/:sectionSlug', auth, sections.update)
  app.del('/sections/:sectionSlug', auth, sections.destroy)

  // chapter routes

  app.get('/sections/:sectionSlug/chapters/new', auth, chapters.new)
  app.post('/sections/:sectionSlug/chapters', auth, chapters.create)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug', auth, chapters.show)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/edit', auth, chapters.edit)
  app.put('/sections/:sectionSlug/chapters/:chapterSlug', auth, chapters.update)
  app.del('/sections/:sectionSlug/chapters/:chapterSlug', auth, chapters.destroy)

  // vis routes

  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/new', auth, visualizations.new)
  app.post('/sections/:sectionSlug/chapters/:chapterSlug/visualizations', auth, visualizations.create)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', auth, visualizations.show)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug/edit', auth, visualizations.edit)
  app.put('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', auth, visualizations.update)
  app.del('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', auth, visualizations.destroy)

  app.param('sectionSlug', sections.load)
  app.param('chapterSlug', chapters.load)
  app.param('slug', visualizations.load)

  // home route
  app.get('/', auth, function (req, res){
    res.render('index')
  })

}
