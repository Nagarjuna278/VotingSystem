const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const cors = require('cors');

const requestIP = require('request-ip');

app.use(express.json());
app.use(cors())
app.use(requestIP.mw())

const vote = require('./routes/vote')

app.use('/vote',vote)

app.listen(4000, ()=> console.log('Server Running in port 4000'))