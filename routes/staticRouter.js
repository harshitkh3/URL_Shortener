
import express from 'express';
const router = express.Router();
import URL from '../models/user.js'
import { checkAuth } from '../middlewares/auth.js';

router.get('/', checkAuth, async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
        urls:allurls,
        user:req.user
    });
})
router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/login',(req,res)=>{
    return res.render('login');
})
export default router