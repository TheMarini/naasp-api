'use strict';
const util = require("../util")

const modelName = "MedicamentoContinuo"
module.exports = (sequelize, DataTypes) => {
  const MedicamentoContinuo = sequelize.define('MedicamentoContinuo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    medicamento: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER,
    // familiarId: DataTypes.INTEGER
  }, {});
  MedicamentoContinuo.associate = function(models) {
    MedicamentoContinuo.belongsTo(models.Acolhido, {foreignKey: "acolhidoId"})
  };

  MedicamentoContinuo.adiciona = async function (medicamento, acolhidoId, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let medicamentoContinuoInstance = await MedicamentoContinuo.create({
        medicamento: medicamento,
        acolhidoId: acolhidoId
      }, queryOptions)
      return medicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.pesquisa = async function (id) {
    try {
      let medicamentoContinuoInstance = await MedicamentoContinuo.findByPk(id)
      return medicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.lista = async function () {
    try {
      let medicamentoContinuoInstances = await MedicamentoContinuo.findAll()
      return medicamentoContinuoInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.edita = async function (id, medicamento, acolhidoId, transaction) {
    let queryOptions = {
      where: {
        id: id
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let medicamentoContinuoInstance = await MedicamentoContinuo.update({
        medicamento: medicamento,
        acolhidoId: acolhidoId
      }, queryOptions)
      return medicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let MedicamentoContinuoInstance = await MedicamentoContinuo.destroy(queryOptions)
      return MedicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.pesquisaOuAdiciona = async function (medicamento, acolhidoId) {
    let queryOptions = {
      where: {
        acolhidoId: acolhidoId,
        medicamento: medicamento
      },
      defaults: {
        medicamento: medicamento,
        acolhidoId: acolhidoId
      }
    }

    try {
      let MedicamentoContinuoInstance = await MedicamentoContinuo.findOrCreate(queryOptions)
      return MedicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  MedicamentoContinuo.adicionaVarios = async function (medicamentos = [], acolhidoId, transaction) {
    let queryOptions = {}
    if (transaction)
      queryOptions.transaction = transaction

    medicamentos.forEach(element => {
      element.acolhidoId = acolhidoId
    });
    console.log(medicamentos)
    try {
      let MedicamentoContinuoInstance = await MedicamentoContinuo.bulkCreate(medicamentos, queryOptions)
      return MedicamentoContinuoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }


  return MedicamentoContinuo;
};