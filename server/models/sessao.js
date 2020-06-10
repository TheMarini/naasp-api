'use strict';
const util = require('../util')
const modelName = "Sessao"

module.exports = (sequelize, DataTypes) => {
  const Sessao = sequelize.define('Sessao', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dataSessao: DataTypes.DATEONLY,
    horaSessao: DataTypes.TIME,
    acolhidoId: DataTypes.INTEGER,
    voluntarioId: DataTypes.INTEGER,
    presenca: DataTypes.STRING,
    observacao: DataTypes.STRING
  }, {});
  Sessao.associate = function(models) {
    Sessao.belongsTo(models.Acolhido, {
      foreignKey: 'acolhidoId'
    })

    Sessao.belongsTo(models.Voluntario, {
      foreignKey: 'voluntarioId'
    })

  };

  Sessao.adiciona = async function (models, param) {

    try {
      let sessaoInstance = await Sessao.create({
        dataSessao: param.dataSessao,
        horaSessao: param.horaSessao,
        presenca: param.presenca,
        observacao: param.observacao,
        acolhidoId: param.acolhidoId,
        voluntarioId: param.voluntarioId})
      return sessaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Sessao.lista = async function () {
    try {
      let sessaoInstance = await Sessao.findAll()
      return sessaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Sessao.pesquisa = async function (id) {
    try {
      let sessaoInstance = await Sessao.findByPk(id)
      return sessaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }


  return Sessao;
};
