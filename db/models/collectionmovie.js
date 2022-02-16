'use strict';
module.exports = (sequelize, DataTypes) => {
  const CollectionMovie = sequelize.define('CollectionMovie', {
    movieId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {});
  CollectionMovie.associate = function(models) {
    // associations can be defined here
  };
  return CollectionMovie;
};