'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    VoluntarioId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.Pessoa, {
      foreignKey: 'VoluntarioId'
    })
  }

  Usuario.adiciona = async function (usuarioParam, t) {
    let queryOptions = {}

    if (t)
      queryOptions.transaction = t

    try {
      let usuarioInstance = await Usuario.create({
        login: usuarioParam.login,
        senha: usuarioParam.senha
      }, queryOptions)
      return usuarioInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Usuario.edita = async function (usuarioParam, t) {
    let queryOptions = {
      where: {
        id: usuarioParam.id
      }
    }

    if (t)
      queryOptions.transaction = t

    try {
      let usuarioInstance = await Usuario.update({
        login: usuarioParam.login,
        senha: usuarioParam.senha
      }, queryOptions)
      return usuarioInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Usuario.pesquisa = async function (models, id) {
    
    let {
      Voluntario,
      Pessoa
    } = models

    try {
      let usuarioInstance = await Usuario.findByPk(id, {
        include: [{
            model: Voluntario,
            as: 'Voluntario',
            include: [{
              model: Pessoa,
              as: 'Pessoa'
            }]
        }]
      })

      return preparaObj(usuarioInstance.dataValues)
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  
  Usuario.lista = async function (models) {
    
    let {
      Voluntario,
      Pessoa
    } = models

    if (transaction)
      queryOptions.transaction = t

    try {
      let usuarioInstance = await Usuario.findAll({
        include: [{
            model: Voluntario,
            as: 'Voluntario',
            include: [{
              model: Pessoa,
              as: 'Pessoa'
            }]
        }]
      })

      return preparaObj(usuarioInstance.dataValues)
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Usuario.login = async function (models, login, senha) {
    let {
      Voluntario,
      Pessoa
    } = models

    try {
      let usuarioInstance = await Usuario.findOne({
        where: {
          login: login, 
          senha: senha
        },
        include: [{
            model: Voluntario,
            as: 'Voluntario',
            include: [{
              model: Pessoa,
              as: 'Pessoa'
            }]
        }]
      })

      return preparaObj(usuarioInstance.dataValues)
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  function preparaObj(usuarioParam) {
    return usuarioParam
  }

  return Usuario;
};
