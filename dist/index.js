"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const database_1 = __importDefault(require("./config/database"));
// import userRouter from "./routes/userRoutes";
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
// app.use("/",userRouter)
app.get("/", (req, res) => {
    res.send({ message: "hello from the front page" });
});
app.post("/register", userController_1.registerUser);
app.post("/login", userController_1.loginUser);
app.get("/getuser", userController_1.getusers);
app.get("/getuserbyemail/:email", userController_1.getuserbyemail);
app.put("/userupdatepass/:email", userController_1.updateUserByEmail);
app.delete("/userDelete/:email", userController_1.deleteUserByEmail);
database_1.default.sync()
    .then(() => {
    console.log("database connected and synchronized");
})
    .catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
