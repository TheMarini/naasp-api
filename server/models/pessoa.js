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
    ReligiaoId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });

  Pessoa.associate = function (models) {
    Pessoa.hasOne(models.Acolhido)
    Pessoa.hasOne(models.Voluntario)
    Pessoa.hasOne(models.Endereco)
    Pessoa.belongsTo(models.Religiao, {
      foreignKey: 'ReligiaoId'
    });
  };

  Pessoa.adiciona = async function (models, param, t) {
    let {
      pessoaParam,
      religiaoParam
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
      
      if(param.enderecoParam)
        await Pessoa.atualizaEndereco(models, param, pessoaInstance, t)
      
      if(param.religiaoParam)
        await Pessoa.atualizaReligiao(models.Religiao, religiaoParam, pessoaInstance, t)

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
        id: pessoaParam.id
      },
      returning: true
    }

    if (t)
      queryOptions.transaction = t

    try {
      let pessoaInstance = await Pessoa.update({
        estado_civil: pessoaParam.estado_civil,
        cpf: pessoaParam.cpf,
        sexo: pessoaParam.sexo,
        nacionalidade: pessoaParam.nacionalidade,
        naturalidade: pessoaParam.naturalidade,
        situacao_profissional: pessoaParam.situacao_profissional,
        escolaridade: pessoaParam.escolaridade,
        nome: pessoaParam.nome,
        data_nascimento: pessoaParam.data_nascimento,
        grauEscolaridade: pessoaParam.grauEscolaridade,
        estadoEscolaridade: pessoaParam.estadoEscolaridade,
        telefoneCelular: pessoaParam.telefoneCelular,
        telefoneResidencia: pessoaParam.telefoneResidencia,
        telefoneComercial: pessoaParam.telefoneComercial,
        email: pessoaParam.email
      }, queryOptions)
      
      pessoaInstance = pessoaInstance[1][0]
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
      enderecoInstance = await models.Endereco.edita(models, param, t)
    else
      enderecoInstance = await models.Endereco.adiciona(models, param, t)

    await pessoaInstance.setEndereco(enderecoInstance, queryOptions)
  }

  Pessoa.atualizaReligiao = async function (Religiao, religiaoParam, pessoaInstance, t) {
    let queryOptions = {
      transaction: t
    }
    let religiaoInstance = await Religiao.pesquisaOuAdiciona(religiaoParam, t)

    await pessoaInstance.setReligiao(religiaoInstance, queryOptions)
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