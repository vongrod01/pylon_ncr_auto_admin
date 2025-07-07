const express = require('express')
const session = require('express-session')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

// ✅ โหลดค่าจาก SystemConfig.json
let systemConfig = JSON.parse(fs.readFileSync('SystemConfig.json', 'utf-8'))
const port = systemConfig.server.port

// ✅ ตั้งค่า session middleware
app.use(
  session({
    secret: 'dev_key', // แนะนำให้อ่านจาก ENV
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // หากใช้ HTTPS ให้เป็น true
      maxAge: 60 * 60 * 1000, // 1 ชม.
    },
  })
)

// ✅ ตั้งค่า CORS
const corsOptions = {
  origin: '*', // ปรับเป็น domain จริงถ้าใช้กับ frontend แยก
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // สำหรับ preflight OPTIONS

// ✅ Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ✅ View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')))

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
const session_api = require('./routers/session_api')

// ✅ ใช้งาน routers
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
  session_api
)

// ✅ เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`)
})
