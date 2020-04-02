'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Endereco', // name of Source model
      'pessoaId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoa', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Usuario', // name of Source model
        'acolhidoId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Voluntario', // name of Source model
        'pessoaId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoa', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Acolhido', // name of Source model
        'pessoaId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoa', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Telefone', // name of Source model
        'pessoaId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoa', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Familiar', // name of Source model
        'acolhidoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'MedicamentoContinuo', // name of Source model
        'acolhidoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'DoencaFamilia', // name of Source model
        'acolhidoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Endereco', // name of Source model
        'cidadeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Cidade', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Endereco', // name of Source model
        'bairroId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Bairro', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Sessao', // name of Source model
        'acolhidoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Sessao', // name of Source model
        'voluntarioId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Voluntario', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'MedicamentoContinuo', // name of Source model
        'familiarId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Familiar', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'DoencaFamilia', // name of Source model
        'familiarId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Familiar', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'AbusoAlcoolFamilia', // name of Source model
        'acolhidoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Acolhido', // name of Source model
        'religiaoId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Religiao', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Usuario', // name of Source model
      'acolhidoId' // key we want to remove
    ).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'pessoaId') // key we want to remove
    }).then(() => {
      return queryInterface.removeColumn(
        'Voluntario', // name of Source model
        'pessoaId') // key we want to remove)
    }).then(() => {
      return queryInterface.removeColumn(
        'Acolhido', // name of Source model
        'pessoaId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Telefone', // name of Source model
        'pessoaId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Familiar', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'medicamentoContinuo', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'DoencaFamilia', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'cidadeId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'bairroId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Sessao', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Sessao', // name of Source model
        'voluntarioId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'MedicamentoContinuo', // name of Source model
        'familiarId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'MedicamentoContinuo', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'DoencaFamilia', // name of Source model
        'familiarId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'AbusoAlcoolFamilia', // name of Source model
        'acolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Acolhido', // name of Source model
        'religiaoId' // key we want to remove
      )
    });
  }
};
