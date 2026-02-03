import express from 'express';
const router = express.Router();
import URL from '../models/user.js'
import { checkAuth } from '../middlewares/auth.js';

router.get('/', checkAuth, async(req,res)=>{
    // console.log('/ route called');
    let allurls = [];
    if(req.user){
        // console.log('user found:', req.user);
        allurls = await URL.find({createdBy: req.user.email});
    } else {
        // console.log('no authenticated user');
    }
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