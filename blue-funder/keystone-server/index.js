const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const PROJECT_NAME = 'Blue Portal Admin Page';
const adapterConfig = { mongoUri: 'mongodb://localhost/keystone' };
const UserSchema = require('./lists/User.js');
const UserRequestSchema = require('./lists/UserRequest.js');


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

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ authStrategy,
                                            enableDefaultRoute: true,
                                            isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin })],
};
