module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Sections', [{
    sectionId: 'e80a1be0-428d-11ea-9434-ab08a1e03ed1',
    sectionName: 'Music'.toUpperCase().trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Sections', null, {}),
};
