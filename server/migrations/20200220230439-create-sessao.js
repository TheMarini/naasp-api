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
      dataInicioSessao: {
        type: Sequelize.DATEONLY
      },
      horaInicioSessao: {
        type: Sequelize.TIME
      },
      dataTerminoSessao: {
        type: Sequelize.DATEONLY
      },
      horaTerminoSessao: {
        type: Sequelize.TIME
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
    return queryInterface.dropTable('Sessao');
  }
};
