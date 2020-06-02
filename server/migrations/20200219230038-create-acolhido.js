'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Acolhido', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      atividade_fisica: {
        type: Sequelize.STRING
      },
      bebida_quantidade: {
        type: Sequelize.STRING
      },
      bebida_periodicidade: {
        type: Sequelize.STRING
      },
      numero_cigarros_por_dia: {
        type: Sequelize.INTEGER
      },
      paroquia: {
        type: Sequelize.STRING
      },
      atividades_religiosas: {
        type: Sequelize.STRING
      },
      demanda: {
        type: Sequelize.STRING
      },
      encaminhamento: {
        type: Sequelize.STRING
      },
      preferenciaAtendimento: {
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.STRING
      },
      prioridade: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Acolhido');
  }
};
