import { nanoid } from 'nanoid'
import URL from '../models/user.js'

async function handleGenerateNewShortURL(req,res){
const body = req.body;
if(!body){
    return res.status(400).json({error:'No URL Entered'})
}
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

async function handleAnalytics(req,res){
    const shortID = req.params.shortID;
    console.log(req.headers["user-agent"])
    const data = await URL.findOne({shortID});
    const ans=data.visitHistory.length;
    console.log(ans);
    return res.json({'number of visits':ans,
        'Analytics':data.visitHistory,
    });
}

async function handlegetalldata(req,res){
    const alldata = await URL.find({});
    let ans=[];
alldata.map(url=>{
    console.log(`the link ${url.redirectedURL} has shortid ${url.shortID}`)
    ans.push({'link':url.redirectedURL, 'shortLink':url.shortID})
    console.log(typeof url.redirectedURL)
})
console.log(ans);
return res.json(ans)
}
export {handleGenerateNewShortURL,handleAnalytics,handlegetalldata};