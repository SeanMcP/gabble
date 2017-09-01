'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})

  Post.associate = function(models) {
    Post.belongsTo(models.User, { as: "user", foreignKey: 'userId' })

    Post.hasMany(models.Like, { as: "likes", foreignKey: 'postId' })
  }

  return Post;
};
