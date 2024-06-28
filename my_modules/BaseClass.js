/*
###############################################################################
#                                                                             #
#    Generate By Genarate Model : Ver 1.0.0 (Developed by Adisorn Vongrod)    #
#                                                                             #
###############################################################################
*/
const mssql = require('../my_modules/mssql.js')
class BaseVO {
    constructor() {
       
    }
    assignTo(destination) {
        let jsonData = JSON.parse(JSON.stringify(this))
        for (var key in jsonData) {
            if (destination[key] !== undefined) {
                destination[key] = jsonData[key]
            }
            else {
                console.log('This destination.attribute(' + key + ') does not exist in ' + this.constructor.name + '.')
            }
        }
    }
    toJson() {
        let jsonData = JSON.parse(JSON.stringify(this))
        let newData = {}
        for (var key in jsonData) {
            let newKey = key[0] === '_' ? key.slice(1, key.length) : key
            newData[newKey] = jsonData[key]
        }
        return newData
    }
    jsonAssignToAttr(jsonData) {
        if (typeof jsonData === 'object') {
            for (var key in jsonData) {
                if (this[key] !== undefined) {
                    this[key] = jsonData[key]
                }
                else {
                    console.log('This attribute(' + key + ') does not exist in ' + this.constructor.name + '.')
                }
            }
        }
    }
}
class BaseEXE extends mssql.MssqlConnection {
    constructor(connDetail) {
        super(connDetail)
    }
    logErrorExec(err) {
        let dividingLine = ''
        for (let index = 0; index < dividingLine.length; index++) {
            dividingLine += '-'

        }
        console.log(dividingLine)
        console.log(err)
        console.log(dividingLine)
    }
}


module.exports.BaseVO = BaseVO
module.exports.BaseEXE = BaseEXE
        
    