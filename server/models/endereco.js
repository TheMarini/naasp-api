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
    cep: DataTypes.STRING,
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

  Endereco.adiciona = async function (models, param, t) {

    let {
      enderecoParam,
      cidadeParam,
      bairroParam
    } = param
    let queryOptions = {}

    if (t)
      queryOptions.transaction = t

    try {

      if (!valida(param))
        return util.defineError(400, "Erro na validação dos campos")

      let enderecoInstance = await Endereco.create({
        rua: enderecoParam.rua,
        numero: enderecoParam.numero,
        complemento: enderecoParam.complemento,
        cep: enderecoParam.cep
      }, queryOptions)

      await Endereco.atualizaCidade(models.Cidade, cidadeParam, enderecoInstance, t)
      await Endereco.atualizaBairro(models.Bairro, bairroParam, enderecoInstance, t)

      // if (!cidadeInstance )
      //   return util.defineError(412, "Erro em cidade")

      // if (!bairroInstance )
      //   return util.defineError(412, "Erro em bairro")

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

  Endereco.edita = async function (models, param, t) {

    let {
      enderecoParam,
      cidadeParam,
      bairroParam
    } = param

    let queryOptions = {
      where: {
        id: enderecoParam.id
      },
      returning: true
    }

    if (t)
      queryOptions.transaction = t

    try {
      
      if (!valida(param))
        return util.defineError(400, "Erro no endereco")

      let enderecoInstance = await Endereco.update({
        rua: enderecoParam.rua,
        numero: enderecoParam.numero,
        complemento: enderecoParam.complemento,
        cep: enderecoParam.cep
      }, queryOptions)

      enderecoInstance = enderecoInstance[1][0]
      await Endereco.atualizaCidade(models.Cidade, cidadeParam, enderecoInstance, t)
      await Endereco.atualizaBairro(models.Bairro, bairroParam, enderecoInstance, t)

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

  function valida(param) {
    let {
      enderecoParam,
      cidadeParam,
      bairroParam
    } = param

    if (enderecoParam.rua != "" &&
      enderecoParam.numero != "" &&
      enderecoParam.cep != "" &&
      cidadeParam != "" &&
      bairroParam != "")
      return true
    else
      return false

  }

  Endereco.atualizaCidade = async function (Cidade, cidadeParam, enderecoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let cidadeInstance = await Cidade.pesquisaOuAdiciona(cidadeParam, t)

    await enderecoInstance.setCidade(cidadeInstance, queryOptions)
  }

  Endereco.atualizaBairro = async function (Bairro, bairroParam, enderecoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let bairroInstance = await Bairro.pesquisaOuAdiciona(bairroParam, t)

    await enderecoInstance.setBairro(bairroInstance, queryOptions)
  }

  return Endereco;
};