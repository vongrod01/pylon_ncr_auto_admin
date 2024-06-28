const express = require("express");
const router = express.Router();
const fs = require("fs");
const mssql = require("mssql");

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/product_ncr_list")
    .get(async (req, res) => {
        let dataSet = []
        try {
            let pool = await mssql.connect(connDetail);
            let request = await pool.request()

                .execute('list_of_product_nrc');
            dataSet = request.recordsets[0];
            res.json(dataSet)
        }
        catch (error) {
            console.log('****** Error list_of_product_nrc : ' + error + '******')
            res.status(404)
            res.json({})
            throw error
        }
    })

router.route("/param_all")
    .get(async (req, res) => {
        const sql = require('../my_modules/mssql.js')
        let a = new sql.MssqlConnection(connDetail)
        await a.execSQL(`select 
pfm.ID,

nat.ProcessNo,
nat.ProcessCaseNo,
pfm.ParamName,
pfm.Detail
from ncr_auto_admin.dbo.param_formula_mapping  pfm
inner join ncr_auto_admin.dbo.ncr_auto_topic nat
on nat.ID = pfm.ID_NCRAutoTopic

where pfm.Active = 1 and pfm.DeleteDate is null and pfm.IsConst = 0`)
        let script = ''
        a.dataSet.forEach(data => {
            script += `
                when pfm.id = ${data.ID} then --ข้อ ${data.ProcessNo}.${data.ProcessCaseNo}  ${data.ParamName} ${data.Detail}
                ---- เริ่มเขียน script ดึงข้อมูลข้อ ${data.ParamName}-----
                    (
                    ''
                    )
                ---- สิ้นสุด script ดึงข้อมูลข้อ ${data.ParamName}-------
            `
        });
        console.log(script)
        res.json(a.dataSet)
        // let dataSet = []
        //     try {
        //         let pool = await mssql.connect(connDetail);
        //         let request = await pool.request()

        //             .execute(`select * from ncr_auto_admin.dbo.param_formula_mapping where Active = 1 and DeleteDate is null `);
        //             dataSet = request.recordsets[0];
        //             res.json(dataSet)
        //     }
        //     catch (error) {
        //         console.log('****** Error list_of_product_nrc : ' + error + '******')
        //         res.status(404)
        //         res.json({})
        //         throw error
        //     }
    })


module.exports = router;