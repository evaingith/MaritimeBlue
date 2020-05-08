const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const bodyParser = require('body-parser')
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const PROJECT_NAME = 'Blue Portal Admin Page';
const SECRET = 'placeholdersecret';
const adapterConfig = { mongoUri: 'mongodb://localhost/keystone' };
const UserSchema = require('./lists/User.js');
const UserRequestSchema = require('./lists/UserRequest.js');
const ListingSchema = require('./lists/Listing.js');
const ListingRequestSchema = require('./lists/ListingRequest.js');


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
     const payload = { username };
     const token = jwt.sign(payload, SECRET, {
         expiresIn: '1h'
     });
     return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  }

  // Return the failure
  return res.sendStatus(401);
}

function signout(req, res) {
   return res.json({ success: true, signedout: true });
}

function ok_response(req, res) {
   return res.sendStatus(200);
}

const checkAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        next();
      }
    });
  }
}


module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ authStrategy,
                                            enableDefaultRoute: true,
                                            isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin })],
  configureExpress: app => {
    app.use('/MaritimeBlue', express.static('public'))
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.post('/signin', signin);
    app.post('/signout', signout);
    app.post('/checkAuth', checkAuth, ok_response);
  },
};
