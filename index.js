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



var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


if (process.env.DATABASE_URL) {
  console.log("heroku");
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     '5432',
    host:     'ec2-34-234-228-127.compute-1.amazonaws.com',
    logging:  true //false
  })
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}else {
  // sequelize = new Sequelize('postgres://postgres:postgres@postgresdb:5432/database_development');
  sequelize = new Sequelize('database_development', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });
  sequelize.sync({ force: true }).then(() => {
    console.log("All models were synchronized successfully.");
  })
}

// sequelize.sync({
//   force: true,
//   logging: console.log
// }).then(() => {
  sequelize
    .authenticate()
    .then(() => {
      var port_number = app.listen(process.env.PORT || 3000);
      http.listen(port_number, function () {
        console.log('Connection has been established successfully.');
        console.log("All models were synchronized successfully.");
        console.log('App listening on port 3000!');
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})



io.on('connection', function(socket){
  socket.on('chat message', function(msg, id){
      io.emit('chat message', msg, id);
      socket.broadcast.emit('chat message', msg, id);
      // console.log('message: ' + msg);
  });
});

// http.listen(3001, function(){
//   console.log('Rodando na porta *:3001');
// });
