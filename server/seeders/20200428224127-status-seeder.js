'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Status', [
        { nome: 'Pré-cadastrado'},
        { nome: 'Em espera'},
        { nome: 'Em atendimento'},
        { nome: 'Desistente'},
        { nome: 'Em alta'}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Status', null, {});
  }
};
