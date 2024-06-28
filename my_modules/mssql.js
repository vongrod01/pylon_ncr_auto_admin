
const { param } = require("jquery");
const mssql = require("mssql");
class MssqlConnection {
    constructor(connDetail) {


        this._dataSet = []
        this._paramsOut = []
        this._connDetail = connDetail
        this.db = require("mssql");

    }

    get dataSet() {
        return this._dataSet
    }
    set dataSet(value) {
        if (typeof value === 'undefined') {
            this._dataSet = []
        }
        else {
            this._dataSet = value
        }
    }

    get paramsOut() {
        return this._paramsOut
    }
    set paramsOut(value) {
        if (typeof value === 'undefined') {
            this._paramsOut = []
        }
        else {
            this._paramsOut = value
        }
    }
    get connDetail() {
        return this._connDetail
    }
    set connDetail(value) {
        this._connDetail = value
    }

    async #getDataQuery(scriptSql) {
        console.log(scriptSql)
        return new Promise((resolve, reject) => {
            mssql.connect(this.connDetail, err => {
                console.log(this.connDetail)
                if (err) {
                    throw err;
                    reject(err)
                }
                console.log("Connection Successful!");
                new mssql.Request().query(scriptSql, function (err, recordset) {
                    if (err) {
                        console.log(err)
                        // this.dataSet = []
                        reject(err)
                    }
                    else {
                        // this.dataSet = recordset.recordset
                        resolve(recordset.recordset)
                    }

                });

            });
        })
    }
    async execSQL(scriptSql) {
        await this.#getDataQuery(scriptSql).then((data) => {
            this.dataSet = data
        })
            .catch((err) => {
                this.dataSet = []
            })
    }

    async callSp(spName, params) {
        this.dataSet = []
        this.paramsOut = []

        try {
            function valType(val) {
                if (typeof val === 'string') {
                    return `N'${val}'`
                }
                else if (val instanceof Date) {
                    return `'${val.getFullYear().toString() + "/" + (val.getMonth() + 1).toString() + "/" + val.getDate() + ' ' + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds()}'`
                }
                else {
                    return val
                }
            }
            let callSpScript = `exec ${spName} `
            let outParams = 'select '
            if (params.length > 0) {

                for (let i = 0; i < params.length; i++) {

                    // setVar += `declare @param${i + 1} = ${valType(params[i])};`
                    if (i !== params.length - 1) {

                        // outParams += `@param${i + 1} as Param${i + 1},`
                        callSpScript += `${valType(params[i])},`
                    }
                    else {
                        // outParams += `@param${i + 1} as Param${i + 1};`
                        callSpScript += `${valType(params[i])} ;`
                    }

                }
            }
            else {
                outParams = ''
                callSpScript = `exec ${spName};`
            }

            outParams = ''
            let data = await this.execSQL(callSpScript)
            if (typeof data[params.length][0] === 'undefined') {
                this.dataSet = []
            }
            else {
                this.dataSet = data[params.length]
            }
            this.paramsOut = data[params.length + 1][0]
        } catch (error) {
            console.log(error)
        }


    }

    async callSp2(spName, params) {
        try {
            let pool = await mssql.connect(this.connDetail);
            let request = await pool.request()
                .input('ProcessNo', params[0])
                .input('ProcessCaseNo', params[1])
                .input('ConditionDetial_TH', params[2])
                .input('ConditionDetial_EN', params[3])
                .input('NCR_Message', params[4])
                .input('Formula', params[5])
                .input('Active', params[6])
                .execute(spName);

            // await request.input('ProcessNo', params[0])
            // await request.input('ProcessCaseNo', params[1])
            // await request.input('ConditionDetial_TH', params[2])
            // await request.input('ConditionDetial_EN', params[3])
            // await request.input('NCR_Message', params[4])
            // await request.input('Formula', params[5])
            // await request.input('Active', params[6])
            // await request.execute(spName)
            this.dataSet =  request.recordsets[0];
            console.log('dataset---------------> ', this.dataSet)
        }
        catch (err) {
            console.log(err);
        }
    }

}
module.exports.MssqlConnection = MssqlConnection
