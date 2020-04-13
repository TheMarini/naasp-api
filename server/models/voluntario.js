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
    EspecialidadeId: DataTypes.INTEGER,
    PessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Voluntario.associate = function(models) {
    // associations can be defined here
    Voluntario.belongsTo(models.Especialidade, {foreignKey: 'EspecialidadeId'})
    Voluntario.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });
  };

  Voluntario.adiciona = async function (models, param) {
  
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      especialidade
    } = param

    let queryOptions = {}
    let transaction = null
    // let transaction = await sequelize.transaction({type: sequelize.Transaction}) 

    try {
      
      let especialidadeInstance = await models.Especialidade.pesquisaOuAdiciona(especialidade, transaction)
      let pessoaInstance = await models.Pessoa.adiciona(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })
      
      if(transaction)
        queryOptions.transaction = transaction
      
      if (!pessoaInstance)
        return util.defineError(412, "Erro em Pessoa")

      if (!especialidadeInstance)
        return util.defineError(412, "Erro em Especialidade")
      
      let voluntarioInstance = await Voluntario.create({
        EspecialidadeId: especialidadeInstance[0].dataValues.id,
        PessoaId: pessoaInstance.dataValues.id
      }, {
        queryOptions
      })
      
      // await transaction.commit()
      voluntarioInstance.dataValues.pessoa = pessoaInstance.dataValues
      return voluntarioInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.edita = async function (models, param) {
  
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      especialidade,
      voluntarioId
    } = param

    let queryOptions = {}
    let transaction = null
    // let transaction = await sequelize.transaction({type: sequelize.Transaction}) 

    try {
      
      let especialidadeInstance = await models.Especialidade.pesquisaOuAdiciona(especialidade, transaction)
      let pessoaInstance = await models.Pessoa.edita(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })
           
      if (!pessoaInstance)
      return util.defineError(412, "Erro em Pessoa")
      
      if (!especialidadeInstance)
      return util.defineError(412, "Erro em Especialidade")
      
      if(transaction)
        queryOptions.transaction = transaction
      
      queryOptions.where = {id: voluntarioId}

      let voluntarioInstance = await Voluntario.update({
        EspecialidadeId: especialidadeInstance[0].dataValues.id
      }, queryOptions)
      
      // await transaction.commit()
      return voluntarioInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.pesquisa = async function (id) {
    try {
      let voluntarioInstance = await Voluntario.findByPk(id)
      return voluntarioInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.pesquisaVoluntarioCompleto = async function (models, id) {
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
      return voluntarioInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.lista = async function () {
    try {
      let voluntarioInstance = await Voluntario.findAll()
      return voluntarioInstance 
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

  return Voluntario;
};
