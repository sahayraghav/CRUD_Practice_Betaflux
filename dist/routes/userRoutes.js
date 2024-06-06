"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/usercreate", userController_1.createuser);
router.get("usercreate", userController_1.getusers);
exports.default = router;
