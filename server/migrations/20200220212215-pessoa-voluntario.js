'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Voluntarios', // name of Source model
      'pessoaId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoas', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Voluntarios', // name of Source model
      'pessoaId' // key we want to remove
    )
  }
};
