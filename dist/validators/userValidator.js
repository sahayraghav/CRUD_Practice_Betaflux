"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUser = [
    (0, express_validator_1.check)("name").isString().isLength({ min: 1 }).withMessage("name is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("email is required"),
    (0, express_validator_1.check)("password").isString().isLength({ min: 5 }).withMessage("password should be of min size 5"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors });
        }
        next();
    }
];
