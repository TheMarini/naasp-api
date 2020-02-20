'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    estado_civil: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    naturalidade: DataTypes.STRING,
    situacao_profissional: DataTypes.STRING,
    escolaridade: DataTypes.STRING,
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    pessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Pessoa.associate = function(models) {
    Pessoa.hasOne(models.acolhido);
    Pessoa.hasOne(models.usuario);
    Pessoa.hasOne(models.voluntario);

  };
  return Pessoa;
};
