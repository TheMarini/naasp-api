'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    'use strict';

    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
          'Pessoa', // name of Source model
          'EnderecoId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Endereco', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        ).then(() => {
          // return queryInterface.addColumn(
          //   'Pessoa', // name of Source model
          //   'EnderecoId', // name of the key we're adding 
          //   {
          //     type: Sequelize.INTEGER,
          //     references: {
          //       model: 'Endereco', // name of Target model
          //       key: 'id', // key in Target model that we're referencing
          //     },
          //     onUpdate: 'CASCADE',
          //     onDelete: 'SET NULL',
          //   }
          // )
        });
      },
      down: (queryInterface, Sequelize) => {}
    };

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};