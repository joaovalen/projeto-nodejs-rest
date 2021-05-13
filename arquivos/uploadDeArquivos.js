const fs = require('fs')

module.exports = (originPath, nomeDoArquivo, callbackImagemCriada) => {
    const finalPath = `.assets/imagens/${nomeDoArquivo}`

    fs.createReadStream(originPath)
        .pipe(fs.createWriteStream(finalPath))
        // Creates a write stream on the destination for the file
        .on('finish', () => callbackImagemCriada(finalPath))
        // Calls the callback function when the write stream is done
}
