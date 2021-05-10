const express = require('express')
//Aplies express for server management
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express()

    //.use is a method for using other librarys 
    app.use(bodyParser.urlencoded({extended: true}))
    // sets the app for receiving urlencoded type requisitions
    app.use(bodyParser.json())
    //sets the app for receiveing json files

    consign()
        .include('controlers')
        .into(app)

    return app
}

