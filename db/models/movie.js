'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    director: DataTypes.STRING(50),
    releaseYear: DataTypes.INTEGER,
    imageURL: DataTypes.STRING
  }, {});
  Movie.associate = function (models) {
    // associations can be defined here
    const columnMappingA = {
      through: 'CollectionMovie',
      otherKey: 'collectionId',
      foreignKey: 'movieId',
      onDelete: 'CASCADE'
    }

    const columnMappingB = {
      through: 'Review',
      otherKey: 'userId',
      foreignKey: 'movieId',
      onDelete: 'CASCADE'
    }

    Movie.belongsToMany(models.Collection, columnMappingA);
    // Movie.hasMany(models.Review, { foreignKey: 'reviewId' });
    Movie.belongsToMany(models.User, columnMappingB)
  };
  return Movie;
};
