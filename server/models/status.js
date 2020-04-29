'use strict';
const util = require("../util")
const modelName = "Status"
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true
  });
  Status.associate = function (models) {
    // associations can be defined here
    Status.hasMany(models.Acolhido);
  };


  Status.adiciona = async function (nome, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let statusInstance = await Status.create({
        nome: nome
      }, queryOptions)
      return statusInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Status.pesquisa = async function (id) {
    try {
      let statusInstance = await Status.findByPk(id)
      return statusInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Status.lista = async function (id) {
    try {
      let StatusInstances = await Status.findAll()
      return StatusInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Status.edita = async function (idParam, nome, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let statusInstance = await Status.update({
        nome: nome
      }, queryOptions)
      return statusInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Status.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let cidade = await Status.destroy(queryOptions)
      return cidade
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Status.pesquisaOuAdiciona = async function (nome) {
    let queryOptions = {
      where: {
        nome: nome
      },
      defaults: {
        nome: nome
      }
    }

    try {
      let statusInstance = await Status.findOrCreate(queryOptions)
      return statusInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Status;
};