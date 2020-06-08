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
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    grauEscolaridade: DataTypes.STRING,
    estadoEscolaridade: DataTypes.STRING,
    email: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    naturalidade: DataTypes.STRING,
    nome: DataTypes.STRING,
    situacao_profissional: DataTypes.STRING,
    sexo: DataTypes.STRING,
    telefoneCelular: DataTypes.STRING,
    telefoneResidencia: DataTypes.STRING,
    telefoneComercial: DataTypes.STRING,
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

  Pessoa.adiciona = async function (models, param, t) {
    let {
      pessoaParam
    } = param

    let queryOptions = {}

    if (t)
      queryOptions.transaction = t

    try {
      valida(pessoaParam)

      let pessoaInstance = await Pessoa.create({
        estado_civil: pessoaParam.estado_civil,
        rg: pessoaParam.rg,
        cpf: pessoaParam.cpf,
        sexo: pessoaParam.sexo,
        nacionalidade: pessoaParam.nacionalidade,
        naturalidade: pessoaParam.naturalidade,
        situacao_profissional: pessoaParam.situacao_profissional,
        nome: pessoaParam.nome,
        data_nascimento: pessoaParam.data_nascimento,
        grauEscolaridade: pessoaParam.grauEscolaridade,
        estadoEscolaridade: pessoaParam.estadoEscolaridade,
        telefoneCelular: pessoaParam.telefoneCelular,
        telefoneResidencia: pessoaParam.telefoneResidencia,
        telefoneComercial: pessoaParam.telefoneComercial,
        email: pessoaParam.email
      }, queryOptions)

      await Pessoa.atualizaEndereco(models, param, pessoaInstance, t)

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

  Pessoa.edita = async function (models, param, t) {
    let { pessoaParam } = param

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
        data_nascimento: pessoa.data_nascimento,
        grauEscolaridade: pessoa.grauEscolaridade,
        estadoEscolaridade: pessoa.estadoEscolaridade,
        telefoneCelular: pessoa.telefoneCelular,
        telefoneResidencia: pessoa.telefoneResidencia,
        telefoneComercial: pessoa.telefoneComercial,
        email: pessoa.email
      }, queryOptions)

      await Pessoa.atualizaEndereco(models, param, pessoaInstance, t)

      return pessoaInstance
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

  Pessoa.atualizaEndereco = async function (models, param, pessoaInstance, t) {
    let {
      enderecoParam
    } = param
    let queryOptions = {
      transaction: t
    }

    let enderecoInstance = null

    //param já com id
    if (Object.keys(enderecoParam).find(key => key == "id"))
      enderecoInstance = await Endereco.edita(models, param, t)
    else
      enderecoInstance = await Endereco.adiciona(models, param, t)

    pessoaInstance.setEndereco(enderecoInstance, queryOptions)
  }

  function valida(pessoa) {
    let {
      data_nascimento = "",
        email = "",
        nome = "",
        telefoneCelular = "",
        telefoneComercial = "",
        telefoneResidencia = ""
    } = pessoa

    if (nome != "" &&
      data_nascimento != "" &&
      (telefoneCelular != "" || telefoneComercial != "" || telefoneResidencia != "") &&
      email != ""
    ) {
      return true
    }

    throw util.defineError(412, "Erro em Pessoa")
  }


  return Pessoa;
};