const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require('path')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"))

// ✅ Middleware สร้าง initData + session
function renderWithInitData(viewName) {
    return (req, res) => {
        try {
            // ✅ ตรวจสอบ session
            if (!req.session.userDetail || !req.session.userDetail.Token) {
                return res.redirect('/login')
            }

            let initData = { ...systemConfig.description }

            initData.port = systemConfig.server.port
            initData.host = systemConfig.server.host
            initData.api1_port = systemConfig.api[0].port
            initData.api1_host = systemConfig.api[0].host

            initData.userDetail = req.session.userDetail
            initData.token = req.session.userDetail.Token

            if (req.query.ID) {
                initData.ID_NCRAutoTopic = req.query.ID
            }

            res.render(viewName, initData)
        } catch (err) {
            console.error('Error in renderWithInitData:', err)
            return res.redirect('/login')
        }
    }
}

// ✅ Route ที่ใช้ session
router.get('/pylon_ncr_auto', renderWithInitData('ncr_auto_topic'))
router.get('/pylon_ncr_auto_param/', renderWithInitData('param_formula_mapping'))
router.get('/pylon_product_ncr/', renderWithInitData('product_ncr_mapping'))
router.get('/link/', renderWithInitData('link'))
router.get('/pylon_ncr_auto_admin/', renderWithInitData('ncr_auto_admin'))
router.get('/pylon_ncr_auto_admin_apply/', renderWithInitData('ncr_auto_admin_apply'))
router.get('/pylon_ncr_auto_report/', renderWithInitData('ncr_auto_report'))

// ✅ หน้า login ไม่ใส่ session
router.get('/login/', (req, res) => {
    let initData = { ...systemConfig.description }

    initData.port = systemConfig.server.port
    initData.host = systemConfig.server.host
    initData.api1_port = systemConfig.api[0].port
    initData.api1_host = systemConfig.api[0].host

    res.render('login.ejs', initData)
})

module.exports = router
