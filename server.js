const express = require('express')
const bodyParser = require('body-parser')
const knex = require('knex')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')
const PORT = process.env.PORT || 3000
const app = express()
const postgres = knex({
    client : "pg",
    connection:{
        host: "127.0.0.1",
        user: "postgres",
        port: "5432",
        password: "12345",
        database: "smartbrainsdb"
    },
})
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json("SUCCESS, use end points to invoke api")
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,postgres,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,postgres,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,postgres)})

app.post('/invokeClarifai',(req,res)=>{image.invokeClarifai(req,res)})

app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
