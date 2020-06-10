const logFile = require("../logs")

function defineError(codigo, mensagem) {
    let e = new Error(mensagem)
    Object.defineProperty(e, "code", { value: codigo })
    return e
}

function checkError(error, model) {
    if( error.code)
        throw error
    // else if (error.name == "SequelizeValidationError")
    //     return this.defineError(500, error.errors[0].message)
    else if (error.name == "SequelizeUniqueConstraintError")
        return this.defineError(500, `${model} já existe`)
    else {
        logFile.log(error)
        throw this.defineError(500, `Erro interno`)
    }
}

function checkIntId(id, model) {
    if (!(new RegExp("^[0-9]*$").test(id))) {
        throw this.defineError(400, `Código de ${model} inválido`)
    }
}

function checkDate(data) {
    let regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]$|[12][0-9]$|3[01]$))/

    if ( !(regex.test(data)) ) {
        throw this.defineError(400, "Data inválida")
    }
}


module.exports = {
    defineError,
    checkError,
    checkIntId,
    checkDate
}