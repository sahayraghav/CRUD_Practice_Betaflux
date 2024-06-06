"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifytoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifytoken = (req, res, next) => {
    if (req.headers.authorization !== undefined) {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, "mysecret", (err, data) => {
            if (!err) {
                next();
            }
            else {
                res.status(403).json({ message: "please send the correct token" });
            }
        });
    }
    else {
        res.status(401).json({ message: "please send token" });
    }
};
exports.verifytoken = verifytoken;
