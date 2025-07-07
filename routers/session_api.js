const express = require('express')
const router = express.Router()

const { setUserSession, getUserSession, clearUserSession } = require('../utils/session')

// POST /set_session
router.post('/set_session', (req, res) => {
  const userDetail = req.body
  // console.log("userDetail : ",userDetail)

  if (!userDetail) {
    return res.status(400).json({ error: 'Missing username or token' })
  }

  setUserSession(req, userDetail )

  res.json({ message: 'Session set successfully', session: getUserSession(req) })
})

// GET /get_session
router.get('/get_session', (req, res) => {
  const sessionData = getUserSession(req)

  if (!sessionData) {
    return res.status(401).json({ error: 'Session not found' })
  }

  res.json({ session: sessionData })
})

// POST /clear_session
router.post('/clear_session', (req, res) => {
  clearUserSession(req)
  res.json({ message: 'Session cleared' })
})

module.exports = router
