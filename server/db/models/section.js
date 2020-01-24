
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    sectionId: {
      type: DataTypes.STRING,
      required: true,
    },
    sectionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  Section.associate = (models) => {
    // associations can be defined here
    Section.hasMany(models.Books, {
      foreignKey: 'sectionId',
      as: 'bookSection',
    });
  };
  return Section;
};
