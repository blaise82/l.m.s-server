module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Books', [{
    isbnNumber: 'b70c27ce-80aa-40e2-98cf-eb5ebf734268',
    sectionId: 'e80a1be0-428d-11ea-9434-ab08a1e03ed1',
    bookName: 'Secrets of love',
    author: 'Emmanuel',
    description: 'This a music book to teach you all you need to know about music',
    bookPrice: 500,
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    isbnNumber: 'b70c27ce-80aa-40e2-98cf-eb5ebf734269',
    sectionId: 'e80a1be0-428d-11ea-9434-ab08a1e03ed1',
    bookName: 'Secrets of love',
    author: 'Emmanuel',
    description: 'This a music book to teach you all you need to know about music',
    bookPrice: 500,
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Books', null, {}),
};
