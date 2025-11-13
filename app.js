const express = require("express");
const app = express();
const porta = 3000;

app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rotaPrincipal = require("./app/routes/router");
app.use("/", rotaPrincipal);

app.listen(porta, ()=>{
    console.log(`Servidor onLine \nhttp://localhost:${porta}`);
});