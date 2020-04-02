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
    AcolhidoId: DataTypes.INTEGER,
    // FamiliarId: DataTypes.INTEGER
  }, {});
  MedicamentoContinuo.associate = function(models) {
    MedicamentoContinuo.belongsTo(models.Acolhido, {foreignKey: "AcolhidoId"})
  };

  MedicamentoContinuo.adiciona = async function (medicamento, AcolhidoId, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let medicamentoContinuoInstance = await MedicamentoContinuo.create({
        medicamento: medicamento,
        AcolhidoId: AcolhidoId
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

  MedicamentoContinuo.edita = async function (id, medicamento, AcolhidoId, transaction) {
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
        AcolhidoId: AcolhidoId
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

  MedicamentoContinuo.pesquisaOuAdiciona = async function (medicamento, AcolhidoId) {
    let queryOptions = {
      where: {
        AcolhidoId: AcolhidoId,
        medicamento: medicamento
      },
      defaults: {
        medicamento: medicamento,
        AcolhidoId: AcolhidoId
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

  MedicamentoContinuo.adicionaVarios = async function (medicamentos = [], AcolhidoId, transaction) {
    let queryOptions = {}
    if (transaction)
      queryOptions.transaction = transaction

    medicamentos.forEach(element => {
      element.AcolhidoId = AcolhidoId
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