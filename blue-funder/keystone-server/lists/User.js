const { Text, Password } = require('@keystonejs/fields');

module.exports = {
  fields: {
    username: {
      type: Text,
      isRequired: true,
    },
    email: {
      type: Text,
      isRequired: true,
    },
    password: {
      type: Password,
      isRequired: true,
    },
    isAdmin: {
      type: Boolean,
    },
  },
};
