'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Deck.associate = function(models) {
    Deck.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })

    Deck.hasMany(models.Card, {
      as: 'cards',
      foreignKey: 'deckId'
    })
  }


  return Deck;
};
