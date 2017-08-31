'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {})

  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  Like.associate = function(models) {
    Like.belongsTo(models.Post, { foreignKey: 'post_id' })
  }

  return Like;
};
