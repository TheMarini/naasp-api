'use strict';
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
    PessoaId: DataTypes.INTEGER,
    BairroId: DataTypes.INTEGER,
    CidadeId: DataTypes.INTEGER
  }, {});

  Endereco.associate = function (models) {
    Endereco.belongsTo(models.Cidade, {
      foreignKey: 'CidadeId'
    });
    Endereco.belongsTo(models.Bairro, {
      foreignKey: 'BairroId'
    });
    Endereco.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });

  };

  Endereco.adiciona = async function (models, transaction, param) {
    let {
      endereco,
      cidade,
      bairro,
      PessoaIdParam
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
        PessoaId: PessoaIdParam,
        BairroId: bairroInstance[0].dataValues.id,
        CidadeId: cidadeInstance[0].dataValues.id
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

  Endereco.edita = async function (models, transaction, param) {
    
    let {
      endereco,
      cidade,
      bairro,
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
        BairroId: bairroInstance[0].dataValues.id,
        CidadeId: cidadeInstance[0].dataValues.id
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