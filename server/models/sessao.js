'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessao = sequelize.define('Sessao', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dataSessao: DataTypes.DATE,
    AcolhidoId: DataTypes.INTEGER,
    VoluntarioId: DataTypes.INTEGER,
    presenca: DataTypes.STRING,
    observacao: DataTypes.STRING
  }, {});
  Sessao.associate = function(models) {
    Sessao.belongsTo(models.Acolhido, {
      foreignKey: 'AcolhidoId'
    })

    Sessao.belongsTo(models.Voluntario, {
      foreignKey: 'VoluntarioId'
    })

  };

  Sessao.adiciona = async function (models, param) {

    try {
      let cidadeInstance = await Sessao.create({
        dataSessao: param.dataSessao,
        presenca: param.presenca,
        observacao: DataTypes.STRING,
        AcolhidoId: DataTypes.INTEGER,
        voluntarioId: DataTypes.INTEGER})
      return cidadeInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Sessao;
};
