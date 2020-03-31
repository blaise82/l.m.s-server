module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    memberID: 'fa33aa10-429d-11ea-87d4-4fef96f87012',
    fullName: 'Member Me',
    email: 'member@gmail.com',
    password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
