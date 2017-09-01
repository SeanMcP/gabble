'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {})

  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'userId' })
  }

  Like.associate = function(models) {
    Like.belongsTo(models.Post, { foreignKey: 'postId' })
  }

  return Like;
};
