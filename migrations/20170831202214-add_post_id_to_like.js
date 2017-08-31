'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Likes',
      'postId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Posts',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Likes', 'postId')
  }
};
