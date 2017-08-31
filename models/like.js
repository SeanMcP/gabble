'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    isLiked: DataTypes.BOOLEAN
  }, {})

  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'userId' })
  }

  Like.associate = function(models) {
    Like.belongsTo(models.Post, { foreignKey: 'postId' })
  }

  return Like;
};
