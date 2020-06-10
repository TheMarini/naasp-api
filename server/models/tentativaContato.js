'use strict';
const util = require("../util")
const modelName = "TentativaContato"
module.exports = (sequelize, DataTypes) => {
  const TentativaContato = sequelize.define('TentativaContato', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    presenca: DataTypes.BOOLEAN,
    horario: DataTypes.DATE,
    AcolhidoId: DataTypes.INTEGER,
    UsuarioId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    hooks: {
      afterCreate: (param1, param2, param3) => {
        console.log(param1, param2, param3)
      }
    }
  })

  TentativaContato.associate = function(models) {
    TentativaContato.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId'
    })
    TentativaContato.belongsTo(models.Acolhido, {
      foreignKey: 'AcolhidoId'
    })
  }

  TentativaContato.adiciona = async function (models, param) {
    console.log(param)
    let t = await sequelize.transaction({type: sequelize.Transaction})
    let queryOptions = {}
    let {
      Usuario,
      Acolhido
    } = models

    if (t)
      queryOptions.transaction = t

    try {
      let tentativaContatoInstance = await TentativaContato.create({
        presenca: param.presenca,
        horario: param.horario  
      }, queryOptions)

      await TentativaContato.atualizaUsuario(Usuario, param, tentativaContatoInstance, t)
      await TentativaContato.atualizaAcolhido(Acolhido, param, tentativaContatoInstance, t)

      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.edita = async function (models, presencaParam) {
    let t = await sequelize.transaction({type: sequelize.Transaction})

    let queryOptions = {
      where: {
        id: presencaParam.id
      }
    }
    let {
      Usuario,
      Acolhido
    } = models

    if (t)
      queryOptions.transaction = t

    try {
      let tentativaContatoInstance = await TentativaContato.create({
        presenca: presencaParam,
        horario: horarioParam
      }, queryOptions)

      await TentativaContato.atualizaUsuario(Usuario, param, tentativaContatoInstance, t)
      await TentativaContato.atualizaAcolhido(Acolhido, param, tentativaContatoInstance, t)

      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  
  TentativaContato.pesquisa = async function(models, id) {
    let {
      Usuario,
      Voluntario,
      Acolhido
    } = models

    try {
      let tentativaContatoInstance = await TentativaContato.findByPk(id, {
        include: [{
          model: Usuario,
          as: "Usuario",
          include: [{
            model: Voluntario,
            as: "Voluntario",
            include: { all: true }
          }]
        },
        {
          model: Acolhido,
          as: "Acolhido",
          include: { all: true }
        }]
      })
      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.lista = async function(models) {
    let {
      Usuario,
      Voluntario,
      Acolhido
    } = models

    try {
      let tentativaContatoInstance = await TentativaContato.findAll({
        include: [{
          model: Usuario,
          as: "Usuario",
          include: [{
            model: Voluntario,
            as: "Voluntario",
            include: { all: true }
          }]
        },
        {
          model: Acolhido,
          as: "Acolhido",
          include: { all: true }
        }]
      })
      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.listaPorAcolhido = async function(models, acolhidoId) {
    let {
      Usuario,
      Voluntario,
      Acolhido
    } = models

    try {
      let tentativaContatoInstance = await TentativaContato.findAll({
        where: {
          AcolhidoId: acolhidoId
        },
        include: [{
          model: Usuario,
          as: "Usuario",
          include: [{
            model: Voluntario,
            as: "Voluntario",
            include: { all: true }
          }]
        },
        {
          model: Acolhido,
          as: "Acolhido",
          include: { all: true }
        }]
      })
      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.listaPorUsuario = async function(models, usuarioId) {
    let {
      Usuario,
      Voluntario,
      Acolhido
    } = models

    try {
      let tentativaContatoInstance = await TentativaContato.findAll({
        where: {
          UsuarioId: usuarioId
        },
        include: [{
          model: Usuario,
          as: "Usuario",
          include: [{
            model: Voluntario,
            as: "Voluntario",
            include: { all: true }
          }]
        },
        {
          model: Acolhido,
          as: "Acolhido",
          include: { all: true }
        }]
      })
      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.atualizaUsuario = async function (Usuario, param, tentativaContatoInstance, t){
    let usuarioInstance  = null
    let { usuarioId } = param
    let queryOptions = {
      transaction: t
    }

    if(usuarioId)
      usuarioInstance = await Usuario.findByPk(usuarioId, queryOptions)
    else 
      throw util.defineError(400, "Usuário não existe")
    
    tentativaContatoInstance.setUsuario(usuarioInstance, queryOptions)
  }
  
  TentativaContato.atualizaAcolhido = async function (Acolhido, param, tentativaContatoInstance, t){
    let acolhidoInstance  = null
    let { acolhidoId } = param
    let queryOptions = {
      transaction: t
    }

    if(acolhidoId)
      acolhidoInstance = await Acolhido.findByPk(acolhidoId, queryOptions)
    else 
      throw util.defineError(400, "Acolhido não existe")
    
    tentativaContatoInstance.setAcolhido(acolhidoInstance, queryOptions)
  }
  
  TentativaContato.deleta = async function (idParam, t) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }

    if (t)
      queryOptions.transaction = t

    try {
      await TentativaContato.destroy(queryOptions)
      return true
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return TentativaContato
}