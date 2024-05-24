import User from "../models/user.js";

async function getSignUp(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
}

async function getSignIn(req, res){
    const { email, password } = req.body;
    
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token', token).redirect("/");
    }catch(error){
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
}

export {
    getSignUp,
    getSignIn,
}