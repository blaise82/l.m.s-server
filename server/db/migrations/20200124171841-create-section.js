
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sections', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    sectionId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    sectionName: {
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
  down: (queryInterface) => queryInterface.dropTable('Sections'),
};
