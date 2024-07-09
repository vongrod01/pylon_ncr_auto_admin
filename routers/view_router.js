const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path')
let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));

router.get('/pylon_ncr_auto', (req, res) => {
    // console.log(req)
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    res.render('ncr_auto_topic.ejs', initData)
})
router.get('/pylon_ncr_auto_param/', (req, res) => {
    // console.log(req)
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    initData.ID_NCRAutoTopic = req.query.ID
    // console.log(initData)
    res.render('param_formula_mapping.ejs', initData)

})
router.get('/pylon_product_ncr/', (req, res) => {
    // console.log(req)
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    // initData.ID_NCRAutoTopic = req.query.ID
    console.log(initData)
    res.render('product_ncr_mapping.ejs', initData)

})
router.get('/pylon_ncr_auto_index/', (req, res) => {
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    res.render('index.ejs', initData)
})
router.get('/pylon_ncr_auto_admin/', (req, res) => {
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    res.render('ncr_auto_admin.ejs', initData)
})
router.get('/pylon_ncr_auto_admin_apply/', (req, res) => {
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    res.render('ncr_auto_admin_apply.ejs', initData)
})
router.get('/pylon_ncr_auto_report/', (req, res) => {
    let initData = systemConfig.description
    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    res.render('ncr_auto_report.ejs', initData)
})




module.exports = router;
