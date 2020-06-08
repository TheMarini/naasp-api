'use strict';
const util = require('../util')
const modelName = "Voluntario"

module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define('Voluntario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    faixaEtariaAtendimento: DataTypes.STRING,
    EspecialidadeId: DataTypes.INTEGER,
    PessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });
  Voluntario.associate = function (models) {
    // associations can be defined here
    Voluntario.belongsTo(models.Especialidade, {
      foreignKey: 'EspecialidadeId'
    })
    Voluntario.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });
  };

  Voluntario.adiciona = async function (models, param) {
    let {
      faixaEtariaAtendimento = []
    } = param
    let t = await sequelize.transaction({
      type: sequelize.Transaction
    })
    let queryOptions = {
      transaction: t
    }
    let faixaEtariaConcat = ""

    for (let index = 0; index < faixaEtariaAtendimento.length; index++) {
      const element = faixaEtariaAtendimento[index];

      faixaEtariaConcat += element

      if (index < faixaEtariaAtendimento.length - 1)
        faixaEtariaConcat += ","
    }

    try {
      let voluntarioInstance = null

      voluntarioInstance = await Voluntario.create({
        faixaEtariaAtendimento: faixaEtariaConcat
      }, {
        queryOptions
      })

      valida()

      await atualizaAssociacoes(models, param, voluntarioInstance, t)
      await t.commit()
      
      return true
      // return {
      //   voluntario: voluntarioInstance.dataValues,
      //   pessoa: pessoaRetorno.pessoaInstance.dataValues,
      //   endereco: pessoaRetorno.enderecoInstance.dataValues
      // }
    } catch (error) {
      await t.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.edita = async function (models, param) {
    let {
      faixaEtariaAtendimento = []
    } = param
    let t = await sequelize.transaction({
      type: sequelize.Transaction
    })
    let queryOptions = {
      transaction: t
    }
    let faixaEtariaConcat = ""

    for (let index = 0; index < faixaEtariaAtendimento.length; index++) {
      const element = faixaEtariaAtendimento[index];

      faixaEtariaConcat += element

      if (index < faixaEtariaAtendimento.length - 1)
        faixaEtariaConcat += ","
    }

    try {
      let voluntarioInstance = null

      voluntarioInstance = await Voluntario.update({
        faixaEtariaAtendimento: faixaEtariaConcat
      }, {
        queryOptions
      })

      valida()

      await atualizaAssociacoes(models, param, voluntarioInstance, t)
      await t.commit()
      
      return true
      // return {
      //   voluntario: voluntarioInstance.dataValues,
      //   pessoa: pessoaRetorno.pessoaInstance.dataValues,
      //   endereco: pessoaRetorno.enderecoInstance.dataValues
      // }
    } catch (error) {
      await t.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.pesquisa = async function (models, id) {
    let {
      Pessoa,
      Endereco,
      Cidade,
      Bairro,
      Voluntario,
      Especialidade
    } = models

    try {
      let voluntarioInstance = await Voluntario.findByPk(id, {
        include: [{
            model: Pessoa,
            as: 'Pessoa',
            include: [{
              model: Endereco,
              as: 'Endereco',
              include: [{
                model: Cidade,
                attributes: ['nome'],
                as: 'Cidade'
              }, {
                model: Bairro,
                attributes: ['nome'],
                as: 'Bairro'
              }]
            }]
          },
          {
            model: Especialidade,
            attributes: ['nome'],
            as: 'Especialidade'
          }
        ]
      })

      return preparaObj(voluntarioInstance.dataValues)
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.lista = async function (models) {
    let {
      Pessoa,
      Endereco,
      Cidade,
      Bairro,
      Voluntario,
      Especialidade
    } = models

    try {
      let voluntarioArray = await Voluntario.findAll({
        raw: true,
        nest: true,
        include: [{
            model: Pessoa,
            as: 'Pessoa',
            include: [{
              model: Endereco,
              as: 'Endereco',
              include: [{
                model: Cidade,
                attributes: ['nome'],
                as: 'Cidade'
              }, {
                model: Bairro,
                attributes: ['nome'],
                as: 'Bairro'
              }]
            }]
          },
          {
            model: Especialidade,
            attributes: ['nome'],
            as: 'Especialidade'
          }
        ]
      })
      voluntarioArray.map((e) => {
        e = preparaObj(e)
      })
      console.log(voluntarioArray)
      return voluntarioArray
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (transaction)
      queryOptions.transaction = transaction

    try {
      let voluntario = await Voluntario.destroy(queryOptions)
      return voluntario
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.atualizaUsuario = async function (Usuario, usuarioParam, voluntarioInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let usuarioInstance = null

    //param já com id
    if (Object.keys(usuarioParam).find(key => key == "id"))
      usuarioInstance = await Usuario.edita(usuarioParam, t)
    else
      usuarioInstance = await Usuario.adiciona(usuarioParam, t)

    voluntarioInstance.setUsuario(usuarioInstance, queryOptions)
  }

  Voluntario.atualizaPessoa = async function (models, param, voluntarioInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let pessoaInstance = null

    //param já com id
    if (Object.keys(pessoaParam).find(key => key == "id") != false)
      pessoaInstance = await Pessoa.edita(models, param, t)
    else
      pessoaInstance = await Pessoa.adiciona(models, param, t)

    voluntarioInstance.setPessoa(pessoaInstance, queryOptions)
  }

  Voluntario.atualizaEspecialidade = async function (Especialidade, especialidadeParam, voluntarioInstance, t) {
    let queryOptions = {
      transaction: t
    }
    let especialidadeInstance = Especialidade.pesquisaOuAdiciona(especialidadeParam, t)

    voluntarioInstance.setEspecialidade(especialidadeInstance, queryOptions)
  }

  function preparaObj(voluntarioRaw) {
    voluntarioRaw.voluntario = {
      id: voluntarioRaw.id,
      faixaEtariaAtendimento: voluntarioRaw.faixaEtariaAtendimento,
      EspecialidadeId: voluntarioRaw.EspecialidadeId,
      PessoaId: voluntarioRaw.PessoaId,
      updatedAt: voluntarioRaw.updatedAt,
      createdAt: voluntarioRaw.createdAt,
      Especialidade: voluntarioRaw.Especialidade
    }

    delete voluntarioRaw.id
    delete voluntarioRaw.faixaEtariaAtendimento
    delete voluntarioRaw.EspecialidadeId
    delete voluntarioRaw.PessoaId
    delete voluntarioRaw.updatedAt
    delete voluntarioRaw.createdAt
    delete voluntarioRaw.Especialidade

    console.log(voluntarioRaw)

    return voluntarioRaw
  }

  async function atualizaAssociacoes(models, param, voluntarioInstance, t) {
    let {
      Especialidade,
      Usuario
    } = models

    let {      
      especialidadeParam,
      usuarioParam
    } = param

    await Voluntario.atualizaPessoa(models, param, voluntarioInstance, t)
    await Voluntario.atualizaEspecialidade(Especialidade, especialidadeParam, voluntarioInstance, t)
    await Voluntario.atualizaUsuario(Usuario, usuarioParam, voluntarioInstance, t)

  }

  function valida(param) {
    let {
      enderecoParam = {},
        pessoaParam = {},
        especialidadeParam = ""
    } = param

    if (!pessoaParam)
      return util.defineError(412, "Erro em Pessoa")

    if (!especialidadeParam)
      return util.defineError(412, "Erro em Especialidade")

    if (!enderecoParam)
      return util.defineError(412, "Erro em Endereco")
  }
  return Voluntario;
};