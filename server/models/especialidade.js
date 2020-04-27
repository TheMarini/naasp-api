'use strict';
const util = require('../util')
const modelName = "Especialidade"

module.exports = (sequelize, DataTypes) => {
  const Especialidade = sequelize.define('Especialidade', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: DataTypes.STRING
  }, {});
  Especialidade.associate = function(models) {
    Especialidade.hasMany(models.Voluntario)
    // associations can be defined here
  };

  Especialidade.adiciona = async function (nome, transaction) {
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let especialidadeInstance = await Especialidade.create({
        nome: nome
      }, queryOptions)
      return especialidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Especialidade.pesquisa = async function (id) {
    try {
      let especialidadeInstance = await Especialidade.findByPk(id)
      return especialidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Especialidade.lista = async function (id) {
    try {
      let especialidadeInstances = await Especialidade.findAll()
      return especialidadeInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Especialidade.edita = async function (idParam, nome, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let especialidadeInstance = await Especialidade.update({
        nome: nome
      }, queryOptions)
      return especialidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Especialidade.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let especialidadeInstance = await Especialidade.destroy(queryOptions)
      return especialidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Especialidade.pesquisaOuAdiciona = async function(nome) {
    let queryOptions = {
      where: {
        nome: nome
      },
      defaults: {
        nome: nome
      }
    }
    
    try {
      let especialidadeInstance = await Especialidade.findOrCreate(queryOptions)
      return especialidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  
  return Especialidade;
};