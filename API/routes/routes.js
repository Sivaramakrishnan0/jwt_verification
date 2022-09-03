var express=require("express");
var router=express.Router();

import * as controller from "../controllers/login";

router.route('/log').post(controller.log);
router.route('/reg').post(controller.reg);
router.route('/test').get(controller.next);

module.exports=router;