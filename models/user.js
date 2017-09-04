'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    location: DataTypes.STRING
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Post, {
      as: "posts",
      foreignKey: 'userId',
      // onDelete: 'cascade'
      // hooks: true
    })

    User.hasMany(models.Like, {
      as: "likes",
      foreignKey: 'userId',
      // onDelete: 'cascade'
      // hooks: true
    })
  }

  return User;
};
