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

if (process.env.DATABASE_URL) {
  console.log("heroku");
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  true //false
  })
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}else {
  sequelize = new Sequelize('database_development', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | '' | 'mssql' */
  });
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}

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