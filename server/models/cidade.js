'use strict';
const util = require("../util")
const modelName = "Cidade"
module.exports = (sequelize, DataTypes) => {
  const Cidade = sequelize.define('Cidade', {
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
  Cidade.associate = function (models) {
    // associations can be defined here
    Cidade.hasMany(models.Endereco);
  };


  Cidade.adiciona = async function (nome, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let cidadeInstance = await Cidade.create({
        nome: nome
      }, queryOptions)
      return cidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Cidade.pesquisa = async function (id) {
    try {
      let cidadeInstance = await Cidade.findByPk(id)
      return cidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Cidade.lista = async function (id) {
    try {
      let CidadeInstances = await Cidade.findAll()
      return CidadeInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Cidade.edita = async function (idParam, nome, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let cidadeInstance = await Cidade.update({
        nome: nome
      }, queryOptions)
      return cidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Cidade.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let cidade = await Cidade.destroy(queryOptions)
      return cidade
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Cidade.pesquisaOuAdiciona = async function (nome) {
    let queryOptions = {
      where: {
        nome: nome
      },
      defaults: {
        nome: nome
      }
    }

    try {
      let cidadeInstance = await Cidade.findOrCreate(queryOptions)
      return cidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Cidade;
};