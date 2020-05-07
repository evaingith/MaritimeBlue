const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const bodyParser = require('body-parser')
const express = require('express');

const PROJECT_NAME = 'Blue Portal Admin Page';
const adapterConfig = { mongoUri: 'mongodb://localhost/keystone' };
const UserSchema = require('./lists/User.js');
const UserRequestSchema = require('./lists/UserRequest.js');
const ListingSchema = require('./lists/Listing.js');
const ListingRequestSchema = require('./lists/ListingRequest.js');


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
});

keystone.createList('User', UserSchema);
keystone.createList('UserRequest', UserRequestSchema);
keystone.createList('Listing', ListingSchema);
keystone.createList('ListingRequest', ListingRequestSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

async function signin (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const result = await authStrategy.validate({
    username,
    password,
  });

  if (result.success) {
    // Create session and redirect
     return res.json({
        success: true,
        session: true,
        date: new Date().getTime(),
        message: result.message
     });
  }

  // Return the failure
  return res.json({ success: false, session: false, message: result.message });
}

function signout(req, res) {
   return res.json({ success: true, signedout: true });
}

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(403).json({ 'error': 'no access' });
}

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ authStrategy,
                                            enableDefaultRoute: true,
                                            isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin })],
  configureExpress: app => {
    app.use(bodyParser.json());
    app.post('/api/signin', signin);
    app.post('/api/signout', signout);
    app.all('/api*', checkAuth);
  },
};
