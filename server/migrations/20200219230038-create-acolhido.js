'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Acolhido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Acolhido');
  }
};
