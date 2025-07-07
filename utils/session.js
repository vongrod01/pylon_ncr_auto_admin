// utils/session.js

function setUserSession(req, userDetail) {
    // console.log("setUserSession : ",userDetail)
  req.session.userDetail = userDetail

}

function getUserSession(req) {
  return req.session || null
}

function clearUserSession(req) {
  req.session.destroy()
}

module.exports = {
  setUserSession,
  getUserSession,
  clearUserSession,
}
