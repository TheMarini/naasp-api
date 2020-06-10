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
      await TentativaContato.atualizaStatusAcolhido(models, tentativaContatoInstance, t)

      await t.commit()
      return tentativaContatoInstance
    } catch (error) {
      await t.rollback();
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  TentativaContato.edita = async function (models, param) {
    let t = await sequelize.transaction({type: sequelize.Transaction})
    
    let queryOptions = {
      returning: true,
      where: {
        id: param.id
      }
    }
    let {
      Usuario,
      Acolhido
    } = models

    if (t)
      queryOptions.transaction = t

    try {
      let tentativaContatoInstance = await TentativaContato.update({
        presenca: param.presenca,
        horario: param.horario
      }, queryOptions)

      tentativaContatoInstance = tentativaContatoInstance[1][0]

      await TentativaContato.atualizaUsuario(Usuario, param, tentativaContatoInstance, t)
      await TentativaContato.atualizaAcolhido(Acolhido, param, tentativaContatoInstance, t)      
      
      await t.commit()
      
      return tentativaContatoInstance
    } catch (error) {
      await t.rollback();
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

  TentativaContato.listaStatusPorAcolhido = async function(models, acolhidoId) {  
    console.log("listaStatusPorAcolhido")

    try {
      let tentativaContatoInstance = await TentativaContato.findAll({
        where: {
          AcolhidoId: acolhidoId
        }
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

  // TentativaContato.atualizaStatusAcolhido = async function (models, tentativaContatoInstance, t) {
  //   console.log("atualizaStatusAcolhido")
  //   let contatos = await TentativaContato.listaStatusPorAcolhido(models, tentativaContatoInstance.AcolhidoId)
        
  //   let cont = 0 
  //   contatos.forEach(e => {
  //     if(!e.presenca)
  //       cont++
  //   })
  //   console.log(cont)   
  //   // if(cont < 10)
  //     // return
        
  //   let acolhidoInstance = await models.Acolhido.findByPk(tentativaContatoInstance.AcolhidoId)

  //   await acolhidoInstance.update({StatusId: 4}, {transaction: t})

  // }

  return TentativaContato
}