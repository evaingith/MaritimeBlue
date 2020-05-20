const { Text } = require('@keystonejs/fields');

module.exports = {
  fields: {
    email: {
      type: Text,
      isRequired: true,
    },
  },
  access: {
    read: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
    delete: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
    update: ({ authentication }) => authentication.item != null && authentication.item.isAdmin,
  },
};
