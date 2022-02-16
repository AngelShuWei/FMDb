'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    director: DataTypes.STRING(50),
    releaseYear: DataTypes.INTEGER,
    imageURL: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'CollectionMovie',
      otherKey: 'collectionId',
      foreignKey: 'movieId'
  }
  Movie.belongsToMany(models.Collection, columnMapping);
  };
  return Movie;
};
