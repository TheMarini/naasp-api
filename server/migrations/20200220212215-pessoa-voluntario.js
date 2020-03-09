'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Voluntario', // name of Source model
      'pessoaId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoa', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Voluntario', // name of Source model
      'pessoaId' // key we want to remove
    )
  }
};
