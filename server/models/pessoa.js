'use strict';
const util = require('../util')

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    pessoaId: DataTypes.INTEGER,
    estado_civil: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    naturalidade: DataTypes.STRING,
    situacao_profissional: DataTypes.STRING,
    escolaridade: DataTypes.STRING,
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    enderecoId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });

  Pessoa.associate = function (models) {
    Pessoa.hasOne(models.Acolhido);
    Pessoa.hasOne(models.Usuario);
    Pessoa.hasOne(models.Voluntario);
    Pessoa.hasOne(models.Endereco, {foreignKey: 'enderecoId'});
  };

  Pessoa.adiciona = async function (pessoaParam) {
    try {
      let pessoaInstance = await Pessoa.create({
        estado_civil: pessoaParam.estado_civil,
        cpf: pessoaParam.cpf,
        sexo: pessoaParam.sexo,
        nacionalidade: pessoaParam.nacionalidade,
        naturalidade: pessoaParam.naturalidade,
        situacao_profissional: pessoaParam.situacao_profissional,
        escolaridade: pessoaParam.escolaridade,
        nome: pessoaParam.nome,
        data_nascimento: pessoaParam.data_nascimento
      })

      return pessoaInstance.dataValues
    } catch (error) {
    console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }
  return Pessoa;
};