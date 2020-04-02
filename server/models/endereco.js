'use strict';
const Bairro = require("./bairro")
const Cidade = require("./cidade")
const util = require("../util")

const modelName = "Endereco"

module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    cep: DataTypes.INTEGER,
    pessoaId: DataTypes.INTEGER,
    bairroId: DataTypes.INTEGER,
    cidadeId: DataTypes.INTEGER
  }, {});

  Endereco.associate = function (models) {
    Endereco.belongsTo(models.Cidade, {
      foreignKey: 'cidadeId'
    });
    Endereco.belongsTo(models.Bairro, {
      foreignKey: 'bairroId'
    });
    Endereco.belongsTo(models.Pessoa, {
      foreignKey: 'pessoaId'
    });

  };

  Endereco.adiciona = async function (models, transaction, param) {
    let {
      endereco,
      cidade,
      bairro,
      pessoaIdParam
    } = param
    let queryOptions = {}
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let bairroInstance = await models.Bairro.pesquisaOuAdiciona(bairro)
      let cidadeInstance = await models.Cidade.pesquisaOuAdiciona(cidade)

      if (!cidadeInstance || !bairroInstance)
        return util.defineError(412, "Erro em cidade ou bairro")

      let enderecoInstance = await Endereco.create({
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
        pessoaId: pessoaIdParam,
        bairroId: bairroInstance.id,
        cidadeId: cidadeInstance.id
      }, queryOptions)
      return enderecoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Endereco.pesquisa = async function (id) {
    try {
      let enderecoInstance = await Endereco.findByPk(id)
      return enderecoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Endereco.lista = async function (id) {
    try {
      let enderecoInstances = await Endereco.findAll()
      return enderecoInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Endereco.edita = async function (models, param, transaction) {
    let {
      endereco,
      cidade,
      bairro,
      pessoaIdParam
    } = param

    let queryOptions = {
      where: {
        id: endereco.id
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let bairroInstance = await models.Bairro.pesquisaOuAdiciona(bairro)
      let cidadeInstance = await models.Cidade.pesquisaOuAdiciona(cidade)

      if (!cidadeInstance || !bairroInstance)
        return util.defineError(412, "Erro em cidade ou bairro")

      let enderecoInstance = await Endereco.update({
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
        pessoaId: pessoaIdParam,
        bairroId: bairroInstance.id,
        cidadeId: cidadeInstance.id
      }, queryOptions)
      return enderecoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Endereco.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let endereco = await Endereco.destroy(queryOptions)
      return endereco
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  return Endereco;
};