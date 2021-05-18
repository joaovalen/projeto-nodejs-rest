const fs = require('fs')
const path = require('path')

module.exports = (originPath, nomeDoArquivo, callbackImagemCriada) => {
    
    const validTypes = ['jpg', 'png', 'jpeg']
    const fileType = path.extname(originPath)
    const typeValidation = validTypes.indexOf(fileType.substring(1)) !== -1
    // Checks the file extension

    if (typeValidation) {
        const finalPath = `./assets/imagens/${nomeDoArquivo}${fileType}`
        
        fs.createReadStream(`assets/${originPath}`)
            .pipe(fs.createWriteStream(finalPath))
            // Creates a write stream on the destination for the file
            .on('finish', () => callbackImagemCriada(false,finalPath))
            // Calls the callback function when the write stream is done
    } else {
        const erro = "Tipo é inválido"
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }
}

