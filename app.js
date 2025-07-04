const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require("fs")

const app = express()

// ✅ กำหนด CORS options ครอบคลุมทุก method และ header ที่ต้องการ
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // ✅ สำคัญมากสำหรับ preflight OPTIONS

// ✅ โหลด routers
const view_router = require('./routers/view_router')
const ncr_auto_topic_api = require('./routers/ncr_auto_topic_api')
const param_formula_mapping_api = require('./routers/param_formula_mapping_api')
const product_ncr_mapping_api = require('./routers/product_ncr_mapping_api')
const ncr_auto_admin_topic_api = require('./routers/ncr_auto_admin_topic_api')
const admin_param_formula_mapping_api = require('./routers/admin_param_formula_mapping_api')
const ncr_auto_admin_project_apply_api = require('./routers/ncr_auto_admin_project_apply_api')
const ncr_auto_admin_apply_api = require('./routers/ncr_auto_admin_apply_api')
const ncr_auto_report_api = require('./routers/ncr_auto_report_api')
const common_api = require('./routers/common_api')

// ✅ ตั้งค่า express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ✅ ตั้งค่า view engine และ static file
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')))

// ✅ ลงทะเบียน routers ทั้งหมด
app.use(
  view_router,
  ncr_auto_topic_api,
  param_formula_mapping_api,
  common_api,
  product_ncr_mapping_api,
  ncr_auto_admin_topic_api,
  admin_param_formula_mapping_api,
  ncr_auto_admin_project_apply_api,
  ncr_auto_admin_apply_api,
  ncr_auto_report_api,
)

// ✅ อ่านพอร์ตจากไฟล์ config
let systemConfig = JSON.parse(fs.readFileSync('SystemConfig.json', 'utf-8'))
const port = systemConfig.server.port

// ✅ เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`start server port ${port}`)
})
