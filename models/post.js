'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})

  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' })
  }

  Post.associate = function(models) {
    Post.hasMany(models.Like, { foreignKey: 'postId' })
  }

  return Post;
};
