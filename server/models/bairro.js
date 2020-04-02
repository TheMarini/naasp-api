'use strict';
const util = require("../util")

const modelName = "Bairro"
module.exports = (sequelize, DataTypes) => {
  const Bairro = sequelize.define('Bairro', {
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
  }, {freezeTableName: true});
  Bairro.associate = function(models) {
    // associations can be defined here
    Bairro.hasMany(models.Endereco);
  };

  Bairro.adiciona = async function (nome, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let bairroInstance = await Bairro.create({
        nome: nome
      }, queryOptions)
      return bairroInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Bairro.pesquisa = async function (id) {
    try {
      let bairroInstance = await Bairro.findByPk(id)
      return bairroInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Bairro.lista = async function (id) {
    try {
      let bairroInstances = await Bairro.findAll()
      return bairroInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Bairro.edita = async function (idParam, nome, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let bairroInstance = await Bairro.update({
        nome: nome
      }, queryOptions)
      return bairroInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Bairro.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let bairro = await Bairro.destroy(queryOptions)
      return bairro
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Bairro.pesquisaOuAdiciona = async function(nome) {
    let queryOptions = {
      where: {
        nome: nome
      }
    }
    
    try {
      let bairroInstance = await Bairro.findOrCreate(queryOptions)
      return bairroInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  

  return Bairro;
};
