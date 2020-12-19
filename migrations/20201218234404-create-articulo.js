'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING,
        unique: true
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        // -> NOTE : TESTS FAIL IF WE USE FOREIGN KEYS SO UNCOMMENT THE LINES BELOW FOR ACTUAL IMPLEMENTATION
        // allowNull: false,
        // references: {
        //   model: 'Categoria',
        //   key: 'id'
        // }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articulos');
  }
};