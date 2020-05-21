const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { SessionManager } = require('@keystonejs/session');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const bodyParser = require('body-parser')
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const path = require('path');

const PROJECT_NAME = 'Blue Portal Admin Page';
const SECRET = 'placeholdersecret';
const MONGO_URI = 'mongodb://localhost/keystone';
const PROJECT_ROOT = '/MaritimeBlue';
const USE_AUTH = true;

const UserSchema = require('./lists/User.js');
const UserRequestSchema = require('./lists/UserRequest.js');
const ListingSchema = require('./lists/Listing.js');
const ListingRequestSchema = require('./lists/ListingRequest.js');
const ConnectRequestSchema = require('./lists/ConnectRequest.js');
const ForgotRequestSchema = require('./lists/ForgottenPasswordRequest.js');

const sessionStore = new MongoStore({ url: MONGO_URI });
const cookieConfig = { path: '/', httpOnly: true, secure: false, maxAge: null };
const adapterConfig = { mongoUri: MONGO_URI };

const sessionManager = new SessionManager({
      SECRET,
      cookieConfig,
      sessionStore,
});


const keystone = new Keystone({
  name: PROJECT_NAME,
  cookieSecret: SECRET,
  adapter: new Adapter(adapterConfig),
  sessionStore: sessionStore,
});

keystone.createList('User', UserSchema);
keystone.createList('UserRequest', UserRequestSchema);
keystone.createList('Listing', ListingSchema);
keystone.createList('ListingRequest', ListingRequestSchema);
keystone.createList('ConnectRequest', ConnectRequestSchema);
keystone.createList('ForgottenPasswordRequest', ForgotRequestSchema);

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
  try {
      const result = await authStrategy.validate({
          username,
          password,
      });

      if (!result.success) {
        return res.sendStatus(401);
      }

      await sessionManager.startAuthedSession(req, result);
    } catch (e) {
      console.log(e);
    }
    const payload = { username };
    const token = jwt.sign(payload, SECRET, {
       expiresIn: '1h'
    });
    return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
}

async function signout(req, res) {
   await sessionManager.endAuthedSession(req);
   return res.json({ success: true, signedout: true });
}

function ok_response(req, res) {
   return res.sendStatus(200);
}

function verify_token(token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return false
      } else {
        return true
      }
    });
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

let adminApp = {}
if (USE_AUTH) {
  adminApp = new AdminUIApp({ authStrategy,
                              enableDefaultRoute: true,
                              hooks: require.resolve('./hooks'),
                              isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin });
} else {
  adminApp = new AdminUIApp({ enableDefaultRoute: true,
                              hooks: require.resolve('./hooks')});

}

module.exports = {
  keystone,
  apps: [new GraphQLApp(), adminApp],
  configureExpress: app => {
    app.use(PROJECT_ROOT, express.static('public'))
    app.use(expressSession({secret: SECRET}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.post('/signin', signin);
    app.post('/signout', signout);
    app.post('/checkAuth', checkAuth, ok_response);
    app.get(PROJECT_ROOT + '/login', function(req, res, next) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public/')});
    });
    app.get(PROJECT_ROOT + '/access', function(req, res, next) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public/')});
    });
    app.get(PROJECT_ROOT + '/portal', function(req, res, next) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public/')});
    });
    app.get(PROJECT_ROOT + '/resetpassword', function(req, res, next) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public/')});
    });
  },
};
