module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    memberID: 'adm001',
    fullName: 'Abdoul Nuru',
    email: 'abdoul@gmail.com',
    password: '$2a$10$32XX7HCI2kFgORh9g1w62Of6p.2zVyanBLadlFE1KhN9slbyjTrD2',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
