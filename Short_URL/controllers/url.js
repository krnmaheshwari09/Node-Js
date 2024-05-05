import { nanoid } from 'nanoid';
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ error: 'url is required' });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render("home", {
        id: shortID,
    });
}

async function handleRedirect(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    // console.log(shortId);
    const result = await URL.findOne({ shortId });
    if(result){
        return res.json({
            totalClicks: result["visitHistory"].length, 
            analytics: result["visitHistory"]
        });
    }else{
        res.status(404).json({ error: "Url not found"});
    }
}


export { handleGenerateNewShortURL, handleRedirect, handleGetAnalytics };