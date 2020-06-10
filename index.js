const Sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");
const router = require("./server/controllers/routes");
const sessaoModel = require("./server/controllers/sessaoController");

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/submit.html");
// });

app.use("/api", router);

if (process.env.DATABASE_URL) {
  console.log("Heroku");
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: "5432",
    host: "ec2-18-214-211-47.compute-1.amazonaws.com",
    logging: true, //false
  });
} else {
  sequelize = new Sequelize(
    "postgres://postgres:postgres@postgresdb:5432/database_development"
  );
  // sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/database_development');
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
      console.log("Connection has been established successfully.");
      console.log("All models were synchronized successfully.");
      console.log("App listening on port 3000!");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// })

io.on("connection", (socket) => {
  async function emiteDados() {
    let sessoes = await sessaoModel.get();
    // console.log(sessoes[0].dataValues.id);
    socket.emit("login", sessoes);
  }
  emiteDados();
  socket.on("sessao", async function (sessao) {
    // recebe o dado
    var verificaSessao = false;
    try {
      await sessaoModel.post(sessao);
    } catch (error) {
      verificaSessao = true;
    }
    if (verificaSessao) {
      io.emit("login", await sessaoModel.get());
    } else {
      io.emit("login", await sessaoModel.get());
    }
  });
  socket.on("deleta", function (id) {
    var verificaDelete = false;
    try {
      sessaoModel.delete(id);
    } catch (e) {
      verificaDelete = true;
    }
    if (verificaDelete) {
      io.emit("deleta", id);
    } else {
      io.emit("deleta", false);
    }
  });
});
