'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    name: DataTypes.STRING
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Post, { as: "posts", foreignKey: 'userId' })
    
    User.hasMany(models.Like, { as: "likes", foreignKey: 'userId' })
  }

  return User;
};
