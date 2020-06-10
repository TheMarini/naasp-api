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
    dataInicioSessao: DataTypes.DATEONLY,
    horaInicioSessao: DataTypes.TIME,
    dataTerminoSessao: DataTypes.DATEONLY,
    horaTerminoSessao: DataTypes.TIME,
    AcolhidoId: DataTypes.INTEGER,
    VoluntarioId: DataTypes.INTEGER,
    SalaId: DataTypes.INTEGER,
    presenca: DataTypes.STRING,
    observacao: DataTypes.STRING
  }, {});
  Sessao.associate = function(models) {
    Sessao.belongsTo(models.Acolhido, {
      foreignKey: 'AcolhidoId'
    })
    Sessao.belongsTo(models.Voluntario, {
      foreignKey: 'VoluntarioId'
    })
    Sessao.belongsTo(models.Sala, {
      foreignKey: 'SalaId'
    })

  };

  Sessao.adiciona = async function (models, param) {

    try {
      let salaInstance = await models.Sala.pesquisaOuAdiciona(param.salanome, transaction)

      if (!salaInstance)
      return util.defineError(412, "Erro em Sala")

      let sessaoInstance = await Sessao.create({
        dataInicioSessao: param.dataInicioSessao,
        horaInicioSessao: param.horaInicioSessao,
        dataTerminoSessao: param.dataTerminoSessao,
        horaTerminoSessao: param.horaTerminoSessao,
        SalaId: salaInstance[0].dataValues.id,
        presenca: param.presenca,
        observacao: param.observacao,
        AcolhidoId: param.AcolhidoId,
        VoluntarioId: param.VoluntarioId})
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

  Sessao.deleta = async function (id) {
    let queryOptions = {
      where: {
        id: id
      }
    }
    try {
      let sessaoInstance = await Sessao.destroy(queryOptions)
      return sessaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Sessao;
};
