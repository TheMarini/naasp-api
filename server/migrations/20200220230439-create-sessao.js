'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataSessao: {
        type: Sequelize.DATE
      },
      acolhidoId: {
        type: Sequelize.INTEGER
      },
      voluntarioId: {
        type: Sequelize.INTEGER
      },
      presenca: {
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessaos');
  }
};