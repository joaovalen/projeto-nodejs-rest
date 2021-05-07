const express = require('express')
const consign = require('consign')

module.exports = () => {
    const app = express()

    consign()
        .include('controlers')
        .into(app)

    return app
}

