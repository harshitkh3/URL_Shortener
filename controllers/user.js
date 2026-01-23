import User from"../models/details.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";
async function handleUserSignup(req,res) {
    console.log('signup handler', req.path, req.body);
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.render('home',{})
}

async function handleLogin(req,res){
    const {email,password}=req.body;

    const finduser = await User.findOne({ email: email, password: password });
    console.log(finduser);
    if(!finduser){
        console.log('wrong')
        return res.render('login',{
            details:true   // show the "wrong details" message
        })
    }
    const token = setUser(finduser)
    res.cookie('uid', token)
    console.log("details entered correctly")
    return res.redirect('/');
}
export {handleUserSignup,handleLogin};