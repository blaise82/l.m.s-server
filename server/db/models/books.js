
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    isbnNumber: {
      type: DataTypes.STRING,
      required: true,
    },
    bookName: {
      ype: DataTypes.STRING,
      required: true,
    },
    author: {
      ype: DataTypes.STRING,
      required: true,
    },
    description: {
      ype: DataTypes.STRING,
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

    Books.belongTo(models.Section, {
      foreignKey: 'sectionId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Books.hasOne(models.Issued, {
      foreignKey: 'isbnNumber',
      as: 'bookIssued',
    });
  };
  return Books;
};
