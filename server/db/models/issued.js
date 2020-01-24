module.exports = (sequelize, DataTypes) => {
  const Issued = sequelize.define('Issued', {
    memberID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fine: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    issuedDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    returnDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {});
  Issued.associate = (models) => {
    // associations can be defined here
    Issued.belongsTo(models.User, {
      foreignKey: 'memberID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Issued.belongsTo(models.Books, {
      foreignKey: 'isbnNumber',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Issued;
};
