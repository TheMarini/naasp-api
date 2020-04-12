const Sequelize = require('sequelize');
const cors = require('cors')
const express = require('express');
const router = require('./server/controllers/routes')

var app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/api', router)

const sequelize = new Sequelize('postgres://postgres:postgres@postgresdb:5432/database_development');

sequelize.sync({
  force: true,
  logging: console.log
}).then(() => {

  sequelize
    .authenticate()
    .then(() => {

      app.listen(3000, function () {
        console.log('Connection has been established successfully.');
        console.log("All models were synchronized successfully.");
        console.log('App listening on port 3000!');
      });

    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})