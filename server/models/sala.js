'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: DataTypes.STRING
  }, {});
  Sala.associate = function(models) {
    // associations can be defined here
    Sala.hasMany(models.Sessao)
  };
  Sala.pesquisaOuAdiciona = async function(nome) {
    let queryOptions = {
      where: {
        nome: nome
      },
      defaults: {
        nome: nome
      }
    }
    try {
      let salaInstance = await Sala.findOrCreate(queryOptions)
      return salaInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  return Sala;
};
