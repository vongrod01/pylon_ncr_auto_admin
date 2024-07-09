const express = require("express");
const router = express.Router();
const fs = require("fs");
const mssql = require("mssql");
let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/ncr_auto_report_param_api")

    .get(async (req, res) => {
        // Get, Search
        let ID_ProductItem = parseInt(req.query.ID_ProductItem)
        let dataSet = []
        try {
           
                let pool = await mssql.connect(connDetail);
                let request = await pool.request()
                .input('ID_ProductItem', ID_ProductItem)
                .execute('ncr_param_detail_listby_id_product_item');
                dataSet = request.recordsets[0];

               
                res.json(dataSet)
           
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
    
router.route("/ncr_auto_report_api")

    .get(async (req, res) => {
        // Get, Search
        let ID_ProductItem = parseInt(req.query.ID_ProductItem)
        let dataSet = []
        try {
           
                let pool = await mssql.connect(connDetail);
                let request = await pool.request()
                .input('ID_ProductItem', ID_ProductItem)
                .execute('ncr_auto_report');
                dataSet = request.recordsets[0];

               
                res.json(dataSet)
           
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
    



module.exports = router;
