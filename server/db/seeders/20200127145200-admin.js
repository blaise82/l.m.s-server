module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    memberID: 'adm001',
    fullName: 'Abdoul Nuru',
    email: 'abdoul@gmail.com',
    password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    memberID: '123445590',
    fullName: 'Izabayo Blaise',
    email: 'blaise@gmail.com',
    password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
