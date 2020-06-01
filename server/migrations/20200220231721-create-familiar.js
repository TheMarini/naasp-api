'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Familiar', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      parentesco: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
      },
      escolaridade: {
        type: Sequelize.STRING
      },
      ocupacao: {
        type: Sequelize.STRING
      },
      cohabita: {
        type: Sequelize.BOOLEAN
      },
      telefone: {
        type: Sequelize.INTEGER
      },
      renda: {
        type: Sequelize.DOUBLE
      },
      responsavel: {
        type: Sequelize.BOOLEAN
      },
      rg: {
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
    return queryInterface.dropTable('Familiar');
  }
};
