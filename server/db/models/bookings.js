module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    pickDate: {
      type: DataTypes.DATE,
      required: true,
    },
    status: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {});
  Bookings.associate = (models) => {
    // associations can be defined here
    Bookings.belongsTo(models.Books, {
      foreignKey: 'isbnNumber',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Bookings.belongsTo(models.User, {
      foreignKey: 'memberID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Bookings;
};
