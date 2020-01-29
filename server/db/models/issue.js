module.exports = (sequelize, DataTypes) => {
  const Issues = sequelize.define('Issues', {
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
  Issues.associate = (models) => {
    // associations can be defined here
    Issues.belongsTo(models.User, {
      foreignKey: 'memberID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Issues.belongsTo(models.Books, {
      foreignKey: 'isbnNumber',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Issues;
};
