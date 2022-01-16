const express = require('express');
const router = require('./app/product/routes');
const app = express();
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())
// middleware static
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use(router);
app.use((req,res)=>{
    res.status(404).json({
        status: 'failed',
        message : "not found"
    })
})

app.listen(process.env.PORT || 5000, ()=> console.log("server running  : http://localhost:5000"))