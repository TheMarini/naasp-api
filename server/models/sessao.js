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
    let t = await sequelize.transaction({
      type: sequelize.Transaction
    })
    let queryOptions = {
      transaction: t
    }
    try {
      let sessaoInstance = await Sessao.create({
        dataInicioSessao: param.dataInicioSessao,
        horaInicioSessao: param.horaInicioSessao,
        dataTerminoSessao: param.dataTerminoSessao,
        horaTerminoSessao: param.horaTerminoSessao,
        presenca: param.presenca,
        observacao: param.observacao
      }, queryOptions)
      
      await Sessao.atualizaSala(models.Sala, param, sessaoInstance, t)
      await Sessao.atualizaAcolhido(models.Acolhido, param, sessaoInstance, t)
      await Sessao.atualizaVoluntario(models.Voluntario, param, sessaoInstance, t)

      await t.commit()
      return sessaoInstance
    } catch (error) {
      await t.rollback()
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Sessao.lista = async function (models) {
    let {
      Acolhido,
      Pessoa,
      Voluntario,
      Sala
    } = models
    
    try {
      let sessaoInstance = await Sessao.findAll(
        {
          raw: true,
          nest: true,
          include: [
            {
              model: Sala,
              attributes: ['nome'],
              as: "Sala"
            },
            {
              model: Acolhido,
              as: "Acolhido",
              include: [{
                model: Pessoa,
                as: "Pessoa"
              }]
            },
            {
              model: Voluntario,
              as: "Voluntario",
              include: [{
                model: Pessoa,
                as: "Pessoa"
              }]
            }
          ]
        }
      )
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

  Sessao.atualizaAcolhido = async function(Acolhido, param, sessaoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let acolhidoInstance = await Acolhido.findByPk(param.acolhidoId)
    await sessaoInstance.setAcolhido(acolhidoInstance, queryOptions)
  }

  Sessao.atualizaVoluntario = async function(Voluntario, param, sessaoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let voluntarioInstance = await Voluntario.findByPk(param.voluntarioId)

    await sessaoInstance.setVoluntario(voluntarioInstance, queryOptions)
  }

  Sessao.atualizaSala = async function(Sala, param, sessaoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let salaInstance = await Sala.pesquisaOuAdiciona(param.salaNome, t)

    await sessaoInstance.setSala(salaInstance, queryOptions)
  }

  return Sessao;
};
