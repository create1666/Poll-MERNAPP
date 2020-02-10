
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models');
const handle = require('./handlers');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res)=>res.json({hello: "world"}));

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`server started on port ${port}`));