import { nanoid } from 'nanoid'
import URL from '../models/user.js'

async function handleGenerateNewShortURL(req,res){
const body = req.body;
if(!body){
    return res.status(400).json({error:'No URL Entered'})
}
console.log(typeof body.url);
const shortID = nanoid(8);
const newuser = await URL.create(
    {
        shortID:shortID,
        redirectedURL:body.url,
        visitHistory:[],
    }
);
console.log(newuser);
return res.json({
    id:`${shortID}`
})
}

export {handleGenerateNewShortURL};