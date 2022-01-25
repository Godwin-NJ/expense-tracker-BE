const express = require('express')
const router = express.Router()

const{
    createUser,
    UserLogin
}  = require('../controllers/user')

router.route('/create').post(createUser)
router.route('/login').post(UserLogin)

module.exports = router


