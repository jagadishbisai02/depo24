const { sendMessage } = require("../controller/messageController");
const Auth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/send/:id", Auth, sendMessage);

module.exports = router;
