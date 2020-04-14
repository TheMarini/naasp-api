'use strict';
const util = require("../util")
const modelName = "Religiao";
module.exports = (sequelize, DataTypes) => {
  const Religiao = sequelize.define('Religiao', {
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
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true
  });
  Religiao.associate = function (models) {
    // associations can be defined here
    Religiao.hasMany(models.Acolhido);
  };

  Religiao.adiciona = async function (nome, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let religiaoInstance = await Religiao.create({
        nome: nome
      }, queryOptions)
      return religiaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Religiao.pesquisa = async function (id) {
    try {
      let religiaoInstance = await Religiao.findByPk(id)
      return religiaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Religiao.lista = async function () {
    try {
      let religiaoInstances = await Religiao.findAll()
      return religiaoInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Religiao.edita = async function (idParam, nome, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let religiaoInstance = await Religiao.update({
        nome: nome
      }, queryOptions)
      return religiaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Religiao.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let religiaoInstance = await Religiao.destroy(queryOptions)
      return religiaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Religiao.pesquisaOuAdiciona = async function(nome, transaction) {
    let queryOptions = {
      where: {
        nome: nome
      },
      defaults: {
        nome: nome
      }
    }
   
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let religiaoInstance = await Religiao.findOrCreate(queryOptions)
      return religiaoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Religiao;
};