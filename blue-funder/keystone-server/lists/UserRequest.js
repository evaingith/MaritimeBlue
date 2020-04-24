const { Text } = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    email: {
      type: Text,
      isRequired: true,
    },
    notes: {
      type: Text
    }
  },
};
