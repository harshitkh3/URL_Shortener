
import express from 'express';
const router = express.Router();
import URL from '../models/user.js'

router.get('/',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
        urls:allurls,
        name:"Harshit"
    });
})
export default router