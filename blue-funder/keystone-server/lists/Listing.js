const { Text, Password, DateTime } = require('@keystonejs/fields');

module.exports = {
  fields: {
    investorName: {
      type: Text,
      isRequired: true,
    },
    investmentSize: {
      type: Text,
      isRequired: true,
    },
    investmentTerm: {
      type: Text,
      isRequired: true,
    },
    capitalType: {
      type: Text,
      isRequired: true,
    },
    geographicFocus: {
      type: Text,
      isRequired: true,
    },
    industryFocus: {
      type: Text,
      isRequired: true,
    },
    opportunityName: {
      type: Text,
      isRequired: true,
    },
    postedDate: {
      type: DateTime,
      isRequired: true,
    },
    endDate: {
      type: DateTime,
      isRequired: true,
    },
    contact: {
      type: Text,
      isRequired: true,
    },
    description: {
      type: Text,
    },
  },
  access: true,
};
