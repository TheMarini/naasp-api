var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const Sequelize = require('sequelize');

if (process.env.DATABASE_URL) {
  console.log("heroku");
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}else {
  sequelize = new Sequelize('postgres://postgres:postgres@postgresdb:5432/database_development');
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
