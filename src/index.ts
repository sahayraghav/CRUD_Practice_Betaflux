import express from "express"
import { getusers,getuserbyemail,updateUserByEmail,registerUser,loginUser,deleteUserByEmail } from "./controllers/userController";
import sequelize from "./config/database";
import { validateUser } from "./validators/userValidator";
import { verifytoken } from "./middleware/authenticate";
import router from "./routers/userRoutes";

const app = express();
const port = 8000;

app.use(express.json())
app.use(router)

app.get("/",(req,res)=>{
    res.send({message:"hello from the front page"})
})


sequelize.sync()
.then(()=>{
    console.log("database connected and synchronized");
})
.catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})