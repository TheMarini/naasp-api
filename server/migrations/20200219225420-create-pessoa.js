'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pessoa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      rg: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      telefoneCelular: {
        type: Sequelize.STRING
      },
      telefoneResidencia: {
        type: Sequelize.STRING
      },
      telefoneComercial: {
        type: Sequelize.STRING
      },
      nacionalidade: {
        type: Sequelize.STRING
      },
      naturalidade: {
        type: Sequelize.STRING
      },
      situacao_profissional: {
        type: Sequelize.STRING
      },
      grauEscolaridade: {
        type: Sequelize.STRING
      },
      estadoEscolaridade: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Pessoa');
  }
};
