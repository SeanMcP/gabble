'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.STRING
  }, {})

  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' })
  }

  Post.associate = function(models) {
    Post.hasMany(models.Like, { as: 'Likes', foreignKey: 'postId' })
  }

  return Post;
};
