'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: DataTypes.STRING(50),
    userId: DataTypes.INTEGER
  }, {});

  Collection.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: 'CollectionMovie',
      otherKey: 'movieId',
      foreignKey: 'collectionId',
      onDelete: 'CASCADE'
    }
    Collection.belongsToMany(models.Movie, columnMapping);
    Collection.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Collection;
};
