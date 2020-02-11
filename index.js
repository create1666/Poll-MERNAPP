
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require('body-parser');
const routes = require('./routes');

const db = require('./models');
const handle = require('./handlers');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(urlencoded({extended:true}));

app.get("/", (req, res)=>res.json({hello: "world"}));
app.use('/api/auth', routes.auth);

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`server started on port ${port}`));