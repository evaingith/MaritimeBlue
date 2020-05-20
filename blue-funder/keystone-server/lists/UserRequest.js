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
  access: {
    read: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
    delete: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
    update: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
  },
};
