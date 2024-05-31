const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());

const router = require("./router");

app.use("",router);

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

module.exports = app;