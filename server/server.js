const express = require('express')
const app = express()

const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { default: axios } = require('axios');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const bcrypt = require("bcrypt")
const saltRounds = 10;

async function start() {
    console.log("connecting")
    await client.connect()
}


var users
start().then(() => {
    db = client.db("login")
    users = db.collection("user")
    console.log("forbundet til db")
})

app.post("/api/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password

    users.findOne({ username: username }, (err, ures) => {
        if(ures == null)
        {
            res.json({ success: false })
        }
        else
        {
            bcrypt.compare(password, ures.password, (err, pres) => {
                res.json({ success: pres })
            })
        }
    })
})

app.listen(port, () => {
    console.log(`det drendrøj kører på http://localhost:${port}`)
})