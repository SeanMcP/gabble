'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {})

  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  Post.associate = function(models) {
    Post.hasMany(models.Like, { as: 'Likes', foreignKey: 'post_id' })
  }

  return Post;
};
