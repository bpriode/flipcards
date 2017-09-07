'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    passwordhash: DataTypes.STRING,
    salt:DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Deck, {
      as: 'decks',
      foreignKey: 'userId'
    })
  }


  return User;
};
