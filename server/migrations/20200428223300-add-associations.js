'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Endereco', // name of Source model
      'PessoaId', // name of the key we're adding 
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
        'VoluntarioId', // name of the key we're adding
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
        'Voluntario', // name of Source model
        'PessoaId', // name of the key we're adding
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
        'Voluntario', // name of Source model
        'EspecialidadeId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Especialidade', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Acolhido', // name of Source model
        'PessoaId', // name of the key we're adding
        {
          allowNull: true,
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
        'PessoaId', // name of the key we're adding 
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
        'AcolhidoId', // name of the key we're adding 
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
        'AcolhidoId', // name of the key we're adding 
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
        'AcolhidoId', // name of the key we're adding 
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
        'CidadeId', // name of the key we're adding 
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
        'BairroId', // name of the key we're adding 
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
        'AcolhidoId', // name of the key we're adding 
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
        'VoluntarioId', // name of the key we're adding 
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
        'DoencaFamilia', // name of Source model
        'FamiliarId', // name of the key we're adding 
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
        'AcolhidoId', // name of the key we're adding 
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
        'ReligiaoId', // name of the key we're adding 
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Religiao', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'Acolhido', // name of Source model
        'StatusId', // name of the key we're adding 
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Status', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'TentativaContato', // name of Source model
        'UsuarioId', // name of the key we're adding 
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Usuario', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'TentativaContato', // name of Source model
        'AcolhidoId', // name of the key we're adding 
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Acolhido', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Usuario', // name of Source model
      'VoluntarioId' // key we want to remove
    ).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'PessoaId') // key we want to remove
    }).then(() => {
      return queryInterface.removeColumn(
        'Voluntario', // name of Source model
        'PessoaId') // key we want to remove)
    }).then(() => {
      return queryInterface.removeColumn(
        'Voluntario', // name of Source model
        'EspecialidadeId') // key we want to remove)
    }).then(() => {
      return queryInterface.removeColumn(
        'Acolhido', // name of Source model
        'PessoaId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Telefone', // name of Source model
        'PessoaId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Familiar', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'medicamentoContinuo', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'DoencaFamilia', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'CidadeId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Endereco', // name of Source model
        'BairroId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Sessao', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Sessao', // name of Source model
        'VoluntarioId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'MedicamentoContinuo', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'DoencaFamilia', // name of Source model
        'FamiliarId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'AbusoAlcoolFamilia', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'Acolhido', // name of Source model
        'ReligiaoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'TentativaContato', // name of Source model
        'AcolhidoId' // key we want to remove
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'TentativaContato', // name of Source model
        'UsuarioId' // key we want to remove
      )
    });

    // .then(() => {
    //   return queryInterface.removeColumn(
    //     'MedicamentoContinuo', // name of Source model
    //     'FamiliarId' // key we want to remove
    //   )
    // })
  }
};