
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    isbnNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    sectionId: {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Sections',
        key: 'sectionId',
        as: 'bookId',
      },
    },
    bookName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bookPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Books'),
};
