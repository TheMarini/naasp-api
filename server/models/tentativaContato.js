'use strict';
module.exports = (sequelize, DataTypes) => {
  const TentativaContato = sequelize.define('TentativaContato', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    presenca: DataTypes.BOOLEAN,
    AcolhidoId: DataTypes.INTEGER,
    UsuarioId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  TentativaContato.associate = function(models) {
    TentativaContato.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId'
    })
    TentativaContato.belongsTo(models.Acolhido, {
      foreignKey: 'AcolhidoId'
    })
  }

  TentativaContato.adiciona = async function (presencaParam, t) {
    
    let queryOptions = {}

    if (transaction)
      queryOptions.transaction = t

    try {
      let tentativaContatoInstance = await TentativaContato.create({
        presenca: presencaParam
      }, queryOptions)
      return tentativaContatoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return TentativaContato;
};