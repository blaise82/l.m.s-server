
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    memberID: {
      type: DataTypes.STRING,
      required: true,
    },
    fullName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Issues, {
      foreignKey: 'memberID',
      as: 'issue',
    });

    User.hasMany(models.Bookings, {
      foreignKey: 'memberID',
      as: 'book',
    });
  };
  return User;
};
