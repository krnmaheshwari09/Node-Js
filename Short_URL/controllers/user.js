import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import { setUser } from "../service/auth.js";

async function handleUserSignup(req, res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserLogin(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user){
        return res.render("login", {
            error: "Invalid email or password",
        });
    }
    // console.log(user);
    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/");
}

export {
    handleUserSignup,
    handleUserLogin,
}