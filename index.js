const express = require('express');
const handle = require('./handlers')

const app = express();
const port = 5000;

app.get("/", (req, res)=>res.json({hello: "world"}));

app.use(handle.NotFound);
app.use(handle.errors);

app.listen(port, console.log(`server started on port ${port}`))