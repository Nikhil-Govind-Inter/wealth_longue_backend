'use strict';

module.exports = {
  'api::enquiry.enquiry': {
    fileBaseName: 'enquiries',
    columns: [
      { header: 'Full Name', key: 'full_name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Submitted On', key: 'createdAt', width: 22, type: 'date' },
    ],
  },
  'api::contact-enquiry.contact-enquiry': {
    fileBaseName: 'contact-enquiries',
    columns: [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Submitted On', key: 'createdAt', width: 22, type: 'date' },
    ],
  },
  'api::profile-assesment-enquiry.profile-assesment-enquiry': {
    fileBaseName: 'profile-assessment-enquiries',
    columns: [
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Age', key: 'age', width: 8 },
      { header: 'Occupation', key: 'occupation', width: 20 },
      { header: 'Risk Comfort', key: 'riskComfort', width: 20 },
      { header: 'Invested Before', key: 'investedBefore', width: 18 },
      { header: 'Investment Experience', key: 'investmentExperience', width: 25 },
      { header: 'Investment Products', key: 'investmentProducts', width: 25 },
      { header: 'Product Interest', key: 'productInterest', width: 25 },
      { header: 'Ready To Invest', key: 'readyToInvest', width: 18 },
      { header: 'Maximum Period', key: 'maximumPeriod', width: 18 },
      { header: 'Annual Income', key: 'annualIncome', width: 18 },
      { header: 'Communication', key: 'communication', width: 20 },
      { header: 'Most Convenient', key: 'mostConvenient', width: 20 },
      { header: 'Additional Details', key: 'additionalDetails', width: 40 },
      { header: 'Submitted On', key: 'createdAt', width: 22, type: 'date' },
    ],
  },
};
