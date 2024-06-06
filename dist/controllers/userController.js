"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByEmail = exports.updateUserByEmail = exports.getuserbyemail = exports.getusers = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//working fine
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ where: { email: email } });
        if (user) {
            return res.status(403).json({ message: "user already exists" });
        }
        const hashedpass = yield bcryptjs_1.default.hash(password, 10);
        const data = yield userModel_1.default.create({ name, email, password: hashedpass });
        res.json({ message: "user created " });
    }
    catch (error) {
        res.status(500).json({ error: "failed to register user" });
    }
});
exports.registerUser = registerUser;
//working fine
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'wrong password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "mysecret");
        res.json({ message: "user logged in", token: token });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});
exports.loginUser = loginUser;
//WORKING FINE
const getusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userModel_1.default.findAll();
        if (data.length === 0) {
            res.status(404).json({ message: "currently no users" });
        }
        else {
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: "failed to get user" });
    }
});
exports.getusers = getusers;
const getuserbyemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const user = yield userModel_1.default.findOne({ where: { email: email } });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "failed to get user" });
    }
});
exports.getuserbyemail = getuserbyemail;
//working fine
const updateUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldemail = req.params.email;
    const { name, email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ where: { email: oldemail } });
        if (user) {
            user.name = name;
            user.email = email;
            const newpass = yield bcryptjs_1.default.hash(password, 10);
            user.password = newpass;
            yield user.save();
            res.json(user);
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "failed to update user" });
    }
});
exports.updateUserByEmail = updateUserByEmail;
//WORKING FINE
const deleteUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldemail = req.params.email;
    try {
        const user = yield userModel_1.default.findOne({ where: { email: oldemail } });
        if (!user) {
            res.status(404).json({ message: "user doesn't exist" });
        }
        else {
            yield user.destroy();
            res.status(404).json({ message: "user deleted" });
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: "failed to delete user" });
    }
});
exports.deleteUserByEmail = deleteUserByEmail;
