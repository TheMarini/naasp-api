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
    AcolhidoId: DataTypes.INTEGER,
    FamiliarId: DataTypes.INTEGER
  }, {});
  DoencaFamilia.associate = function (models) {
    DoencaFamilia.belongsTo(models.Acolhido, {
      foreignKey: "AcolhidoId"
    })
    DoencaFamilia.belongsTo(models.Familiar, {
      foreignKey: "FamiliarId"
    })
  };

  DoencaFamilia.adiciona = async function (doenca, AcolhidoId, FamiliarId, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let doencaFamiliaInstance = await DoencaFamilia.create({
        doenca: doenca,
        AcolhidoId: AcolhidoId,
        FamiliarId: FamiliarId
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

  DoencaFamilia.edita = async function (doencaFamilia, AcolhidoId, FamiliarId, transaction) {
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
        FamiliarId: FamiliarId,
        AcolhidoId: AcolhidoId
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

  DoencaFamilia.pesquisaOuAdiciona = async function (FamiliarId, AcolhidoId, doenca) {
    let queryOptions = {
      where: {
        FamiliarId: FamiliarId,
        AcolhidoId: AcolhidoId
      },
      defaults: {
        FamiliarId: FamiliarId,
        AcolhidoId: AcolhidoId,
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

  DoencaFamilia.adicionaVarios = async function (doencasFamiliares = [], AcolhidoId) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    doencasFamiliares.map(e => {
      e = {
        doenca: e.doenca,
        FamiliarId: e.familiar,
        AcolhidoId: AcolhidoId
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