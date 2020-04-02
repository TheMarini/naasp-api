'use strict';
const util = require("../util")

const modelName = "DoencaFamilia"

module.exports = (sequelize, DataTypes) => {
  const DoencaFamilia = sequelize.define('DoencaFamilia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    doenca: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER,
    FamiliarId: DataTypes.INTEGER
  }, {});
  DoencaFamilia.associate = function (models) {
    DoencaFamilia.belongsTo(models.Acolhido, {
      foreignKey: "acolhidoId"
    })
    DoencaFamilia.belongsTo(models.Familiar, {
      foreignKey: "familiarId"
    })
  };

  DoencaFamilia.adiciona = async function (doenca, acolhidoId, familiarId, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let doencaFamiliaInstance = await DoencaFamilia.create({
        doenca: doenca,
        acolhidoId: acolhidoId,
        familiarId: familiarId
      }, queryOptions)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.pesquisa = async function (id) {
    try {
      let doencaFamiliaInstance = await DoencaFamilia.findByPk(id)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.lista = async function () {
    try {
      let doencaFamiliaInstances = await DoencaFamilia.findAll()
      return doencaFamiliaInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.edita = async function (doencaFamilia, acolhidoId, familiarId, transaction) {
    let {
      id,
      doenca
    } = doencaFamilia
    let queryOptions = {
      where: {
        id: id
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let doencaFamiliaInstance = await DoencaFamilia.update({
        doenca: doenca,
        familiarId: familiarId,
        acolhidoId: acolhidoId
      }, queryOptions)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let doencaFamiliaInstance = await DoencaFamilia.destroy(queryOptions)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.pesquisaOuAdiciona = async function (familiarId, acolhidoId, doenca) {
    let queryOptions = {
      where: {
        familiarId: familiarId,
        acolhidoId: acolhidoId
      },
      defaults: {
        familiarId: familiarId,
        acolhidoId: acolhidoId,
        doenca: doenca
      }
    }

    try {
      let doencaFamiliaInstance = await DoencaFamilia.findOrCreate(queryOptions)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  DoencaFamilia.adicionaVarios = async function (doencasFamiliares = [], acolhidoId) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    doencasFamiliares.map(e => {
      e = {
        doenca: e.doenca,
        familiarId: e.familiar,
        acolhidoId: acolhidoId
      }
    })
    try {
      let doencaFamiliaInstance = await DoencaFamilia.bulkCreate(doencasFamiliares, queryOptions)
      return doencaFamiliaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return DoencaFamilia;
};