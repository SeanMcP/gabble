'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    name: DataTypes.STRING
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Post, { as: 'Posts', foreignKey: 'userId' })
  }

  User.associate = function(models) {
    User.hasMany(models.Like, { as: 'Likes', foreignKey: 'userId' })
  }

  return User;
};
