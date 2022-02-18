'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING(20),
    hashedPassword: DataTypes.STRING.BINARY,
    email: DataTypes.STRING(255)
  }, {});
  User.associate = function (models) {
    // associations can be defined here

    // const columnMappingB = {
    //   through: 'Review',
    //   otherKey: 'movieId',
    //   foreignKey: 'userId',
    // }

    User.hasMany(models.Collection, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
    // User.hasMany(models.Review, { foreignKey: 'reviewId' });
    // User.belongsToMany(models.Movie, columnMappingB)
  };
  return User;
};
