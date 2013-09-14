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
  //, env = process.env.NODE_ENV || 'development'
  //, config = require('./config')[env]
  //, express = require('express')
  //, auth = require('./middlewares/authorization')

//var auth = express.basicAuth(config.user, config.password)


/**
 * Route middlewares
 */

// Authenticator


//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

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

  app.get('/sections', sections.index)
  app.get('/sections/new', sections.new)
  app.post('/sections', sections.create)
  app.get('/sections/:sectionSlug', sections.show)
  app.get('/sections/:sectionSlug/edit', sections.edit)
  app.put('/sections/:sectionSlug', sections.update)
  app.del('/sections/:sectionSlug', sections.destroy)

  // chapter routes

  app.get('/sections/:sectionSlug/chapters/new', chapters.new)
  app.post('/sections/:sectionSlug/chapters', chapters.create)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug', chapters.show)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/edit', chapters.edit)
  app.put('/sections/:sectionSlug/chapters/:chapterSlug', chapters.update)
  app.del('/sections/:sectionSlug/chapters/:chapterSlug', chapters.destroy)

  // vis routes

  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/new', visualizations.new)
  app.post('/sections/:sectionSlug/chapters/:chapterSlug/visualizations', visualizations.create)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', visualizations.show)
  app.get('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug/edit', visualizations.edit)
  app.put('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', visualizations.update)
  app.del('/sections/:sectionSlug/chapters/:chapterSlug/visualizations/:slug', visualizations.destroy)

  app.param('sectionSlug', sections.load)
  app.param('chapterSlug', chapters.load)
  app.param('slug', visualizations.load)

  // home route
  app.get('/', function (req, res){
    res.render('index')
  })

}
