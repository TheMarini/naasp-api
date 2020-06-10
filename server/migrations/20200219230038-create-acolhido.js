'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Acolhido', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      alcoolismoFamilia: {
        type: Sequelize.STRING
      },
      atividadeFisica: {
        type: Sequelize.STRING
      },
      atividadesReligiosas: {
        type: Sequelize.STRING
      },
      bebidaQuantidade: {
        type: Sequelize.STRING
      },
      cigarroQuantidade: {
        type: Sequelize.INTEGER
      },
      condicoesMoradia:{
        type: Sequelize.STRING
      },
      demanda: {
        type: Sequelize.STRING
      },
      encaminhamento: {
        type: Sequelize.STRING
      },
      medicamentosFamilia: {
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.STRING
      },
      observacaoBeneficioGoverno: {
        type: Sequelize.STRING
      },
      paroquia: {
        type: Sequelize.STRING
      },
      preferenciaAtendimento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prioridade: {
        type: Sequelize.INTEGER
      },
      tipoBeneficioGoverno: {
        type: Sequelize.STRING
      },
      valorBeneficioGoverno:{
        type: Sequelize.DOUBLE
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
