'use strict';
const util = require("../util")

const modelName = "Familiar"
module.exports = (sequelize, DataTypes) => {
  const Familiar = sequelize.define('Familiar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    parentesco: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    escolaridade: DataTypes.STRING,
    ocupacao: DataTypes.STRING,
    cohabita: DataTypes.BOOLEAN,
    telefone: DataTypes.STRING,
    renda: DataTypes.DOUBLE,
    responsavel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rg: DataTypes.STRING,
    AcolhidoId: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {})

  Familiar.associate = function(models) {
      Familiar.belongsTo(models.Acolhido, {
        foreignKey: "AcolhidoId"
      })
      Familiar.hasMany(models.DoencaFamilia)
  }

  Familiar.adiciona = async function (familiar, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let familiarInstance = await Familiar.create({
        nome: familiar.nome,
        parentesco: familiar.parentesco,
        data_nascimento: familiar.data_nascimento,
        escolaridade: familiar.escolaridade,
        ocupacao: familiar.ocupacao,
        cohabita: familiar.cohabita,
        telefone: familiar.telefone,
        renda: familiar.renda,
        responsavel: familiar.responsavel,
        rg: familiar.rg
      }, queryOptions)
      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.pesquisa = async function (id) {
    try {
      let familiarInstance = await Familiar.findByPk(id)
      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.lista = async function () {
    try {
      let familiarInstances = await Familiar.findAll()
      return familiarInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.edita = async function (familiar, t) {
    let queryOptions = {
      where: {
        id: familiar.id
      },
      returning: true
    }

    if (t)
      queryOptions.transaction = t

    try {
      let familiarInstance = await Familiar.update({
        nome: familiar.nome,
        parentesco: familiar.parentesco,
        data_nascimento: familiar.data_nascimento,
        escolaridade: familiar.escolaridade,
        ocupacao: familiar.ocupacao,
        cohabita: familiar.cohabita,
        telefone: familiar.telefone,
        renda: familiar.renda,
        responsavel: familiar.responsavel,
        rg: familiar.rg
      }, queryOptions)

      familiarInstance = familiarInstance[1][0]
      
      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let familiarInstance = await Familiar.destroy(queryOptions)
      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.pesquisaOuAdiciona = async function(familiar) {
    let queryOptions = {
      where: {
        rg: familiar.rg
      },
      defaults: {
        nome: familiar.nome,
        parentesco: familiar.parentesco,
        data_nascimento: familiar.data_nascimento,
        escolaridade: familiar.escolaridade,
        ocupacao: familiar.ocupacao,
        cohabita: familiar.cohabita,
        telefone: familiar.telefone,
        renda: familiar.renda,
        responsavel: familiar.responsavel,
        rg: familiar.rg,
        AcolhidoId: AcolhidoId
      }
    }
    
    try {
      let familiarInstance = await Familiar.findOrCreate(queryOptions)
      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Familiar.adicionaVarios = async function(familiares = [], transaction) {
    let queryOptions = { returning: true }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let familiarInstance = await Familiar.bulkCreate(familiares, queryOptions)

      return familiarInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Familiar;
};