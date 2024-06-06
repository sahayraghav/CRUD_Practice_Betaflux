import { Router } from "express";
import { validateUser } from "../validators/userValidator";
import { verifytoken } from "../middleware/authenticate";
import { getuserbyemail,getusers,deleteUserByEmail,updateUserByEmail,loginUser,registerUser } from "../controllers/userController";

const router = Router()

router.post("/register",validateUser,registerUser)
router.post("/login",loginUser)

router.get("/users",verifytoken,getusers)
router.get("/getuserbyemail/:email",verifytoken,getuserbyemail)
router.put("/updateuserbyemail/:email",validateUser,verifytoken,updateUserByEmail)
router.delete("/deleteuserbyemail/:email",verifytoken,deleteUserByEmail)

export default router;