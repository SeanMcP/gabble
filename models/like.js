'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {})

  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      as: "user",
      foreignKey: 'userId'
      // onDelete: 'cascade',
      // hooks: true
    })

    Like.belongsTo(models.Post, {
      as: "post",
      foreignKey: 'postId'
      // onDelete: 'cascade',
      // hooks: true
    })
  }

  return Like;
};
