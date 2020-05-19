const { Text } = require('@keystonejs/fields');

module.exports = {
  fields: {
    investorContact: {
      type: Text,
      isRequired: true,
    },
    applicantName: {
      type: Text,
      isRequired: true,
    },
    applicantEmail: {
      type: Text,
      isRequired: true,
    },
    opportunityName: {
      type: Text,
      isRequired: true,
    },
    applicantLocation: {
      type: Text,
      isRequired: true,
    },
    description: {
      type: Text,
      isRequired: true,
    },
  },
  access: true,
};
