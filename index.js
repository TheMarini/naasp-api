const express = require('express')

const app = express();
const port = 3000;

app.use('', (req, res)=>{
    console.log("Servidor operando na porta ", port)
})

app.listen(port, function(){
  console.log("Node app is running on port", port);
})
