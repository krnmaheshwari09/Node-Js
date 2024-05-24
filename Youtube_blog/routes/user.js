import { Router } from "express";
import { getSignUp, getSignIn } from "../controllers/user.js";

const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signin', getSignIn);
router.post('/signup', getSignUp);

router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
})

export default router;