const express = require('express');
const { logout, login, register, getMe } = require('../controllers/userController');
const {authMiddleware} = require('../middlewares/auth');

const UserRouter = express.Router();


// to register 
UserRouter.post('/register', register)

// to login the user
UserRouter.post('/login', login)
// to logout 
UserRouter.post('/logout', logout)
// to get user profile
UserRouter.get('/me',authMiddleware, getMe)

module.exports = { UserRouter }