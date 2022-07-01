const express = require('express');
const app = express();
const router = express.Router();
const  loginUsers  = require('../controller/loginController');
const  registerUsers = require('../controller/registerController');
const  logoutUsers =  require('../controller/logoutController');


router.post('/register', registerUsers);

router.post('/login', loginUsers);

router.get('/logout', logoutUsers);




module.exports = router;