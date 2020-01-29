
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    isbnNumber: {
      type: DataTypes.STRING,
      required: true,
    },
    bookName: {
      type: DataTypes.STRING,
      required: true,
    },
    author: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    bookPrice: {
      type: DataTypes.INTEGER,
      required: true,
    },
    status: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {});
  Books.associate = (models) => {
    // associations can be defined here
    Books.hasOne(models.Bookings, {
      foreignKey: 'isbnNumber',
      as: 'booked',
    });

    Books.belongsTo(models.Section, {
      foreignKey: 'sectionId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Books.hasOne(models.Issues, {
      foreignKey: 'isbnNumber',
      as: 'bookIssued',
    });
  };
  return Books;
};
