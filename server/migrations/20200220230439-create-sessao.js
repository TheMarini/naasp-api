'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataSessao: {
        type: Sequelize.DATEONLY
      },
      horaSessao: {
        type: Sequelize.TIME
      },
      presenca: {
        type: Sequelize.STRING
      },
      acolhidoId: {
        type: Sequelize.STRING
      },
      voluntarioId: {
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
    return queryInterface.dropTable('Sessao');
  }
};
