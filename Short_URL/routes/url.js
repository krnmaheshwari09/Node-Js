import express from "express";
import { handleGenerateNewShortURL, handleRedirect, handleGetAnalytics } from "../controllers/url.js";


const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/:shortId', handleRedirect);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;