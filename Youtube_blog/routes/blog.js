import { Router } from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";
import { createComment, createNewBlog, getBlogById } from "../controllers/blog.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});

router.get('/:id', getBlogById);

router.post('/comment/:blogId', createComment);

router.post('/', upload.single('coverImage'), createNewBlog);

export default router;