const express = require('express');
const { register , login , Avatar , allusers } = require('../controllers/userController');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/Avatar/:id" , Avatar);
router.get("/allusers" , allusers)

module.exports = router;