const fs = require('fs')

module.exports = (originPath, nomeDoArquivo, callbackImagemCriada) => {
    const finalPath = `./assets/${nomeDoArquivo}`

    fs.createReadStream(`assets/${originPath}`)
        .pipe(fs.createWriteStream(finalPath))
        // Creates a write stream on the destination for the file
        .on('finish', () => callbackImagemCriada(finalPath))
        // Calls the callback function when the write stream is done
}

