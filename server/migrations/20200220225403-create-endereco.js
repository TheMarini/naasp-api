'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Enderecos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pessoaId: {
        type: Sequelize.INTEGER
      },
      bairroId: {
        type: Sequelize.INTEGER
      },
      cidadeId: {
        type: Sequelize.INTEGER
      },
      rua: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      complemento: {
        type: Sequelize.STRING
      },
      cep: {
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
    return queryInterface.dropTable('Enderecos');
  }
};