/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
//  , sections = require('../app/controllers/sections')
  , visualizations = require('../app/controllers/visualizations')
  , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
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

  /* sections routes
  app.get('/sections', sections.index)
  app.get('/sections/new', sections.new)
  app.post('/sections', sections.create)
  app.get('/sections/:id', sections.show)
  app.get('/sections/:id/edit', sections.edit)
  app.put('/sections/:id', sections.update)
  app.del('/sections/:id', sections.destroy)
  */

  // vis routes

  app.get('/visualizations', visualizations.index)
  app.get('/visualizations/new', visualizations.new)
  app.post('/visualizations', visualizations.create)
  app.get('/visualizations/:slug', visualizations.show)
  app.get('/visualizations/:slug/edit', visualizations.edit)
  app.put('/visualizations/:slug', visualizations.update)
  app.del('/visualizations/:slug', visualizations.destroy)

  app.param('slug', visualizations.load)

  // home route
  app.get('/', visualizations.index)

}
