
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
const fs = require("fs")
const view_router = require('./routers/view_router')
const ncr_auto_topic_api = require('./routers/ncr_auto_topic_api')
const param_formula_mapping_api = require('./routers/param_formula_mapping_api')
const product_ncr_mapping_api = require('./routers/product_ncr_mapping_api')
const ncr_auto_admin_topic_api = require('./routers/ncr_auto_admin_topic_api')
const admin_param_formula_mapping_api = require('./routers/admin_param_formula_mapping_api')
const common_api = require('./routers/common_api')

app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') // ทำให้ html เป็น dinamic โดยใช้ ejs
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    view_router,
    ncr_auto_topic_api,
    param_formula_mapping_api,
    common_api,
    product_ncr_mapping_api,
    ncr_auto_admin_topic_api,
    admin_param_formula_mapping_api
)

let systemConfig = JSON.parse(fs.readFileSync('SystemConfig.json', 'utf-8'))
const port = systemConfig.server.port

app.listen(port,() => {
    console.log(`start server port ${port}`)
})