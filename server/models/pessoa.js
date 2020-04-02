'use strict';
const util = require('../util')
const modelName = "Pessoa"

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    cpf: DataTypes.INTEGER,
    rg: DataTypes.INTEGER,
    data_nascimento: DataTypes.DATE,
    escolaridade: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    naturalidade: DataTypes.STRING,
    nome: DataTypes.STRING,
    situacao_profissional: DataTypes.STRING,
    sexo: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });

  Pessoa.associate = function (models) {
    Pessoa.hasOne(models.Acolhido);
    Pessoa.hasOne(models.Usuario);
    Pessoa.hasOne(models.Voluntario);
    Pessoa.hasOne(models.Endereco);
  };

  Pessoa.adiciona = async function (models, transaction, param) {
    let {
      pessoa,
      endereco,
      cidade,
      bairro
    } = param

    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let pessoaInstance = await Pessoa.create({
        estado_civil: pessoa.estado_civil,
        cpf: pessoa.cpf,
        sexo: pessoa.sexo,
        nacionalidade: pessoa.nacionalidade,
        naturalidade: pessoa.naturalidade,
        situacao_profissional: pessoa.situacao_profissional,
        escolaridade: pessoa.escolaridade,
        nome: pessoa.nome,
        data_nascimento: pessoa.data_nascimento
      }, queryOptions)
    
      await models.Endereco.adiciona(models, transaction, {
        endereco: endereco,
        cidade: cidade,
        bairro: bairro,
        pessoaIdParam: pessoaInstance.id
      })

      return pessoaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Pessoa.pesquisa = async function (id) {
    try {
      let pessoaInstance = await Pessoa.findByPk(id)
      return pessoaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Pessoa.lista = async function (id) {
    try {
      let pessoaInstances = await Pessoa.findAll()
      return pessoaInstances
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Pessoa.edita = async function (pessoa, transaction) {
    let queryOptions = {
      where: {
        id: pessoa.id
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let pessoaInstance = await Pessoa.update({
        estado_civil: pessoa.estado_civil,
        cpf: pessoa.cpf,
        sexo: pessoa.sexo,
        nacionalidade: pessoa.nacionalidade,
        naturalidade: pessoa.naturalidade,
        situacao_profissional: pessoa.situacao_profissional,
        escolaridade: pessoa.escolaridade,
        nome: pessoa.nome,
        data_nascimento: pessoa.data_nascimento
      }, queryOptions)
      return PessoaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Pessoa.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let pessoa = await Pessoa.destroy(queryOptions)
      return pessoa
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Pessoa.log = () => {
    console.log("PESSOA -- LOG")
  }
  return Pessoa;
};