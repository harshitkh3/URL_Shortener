import { getUser } from "../service/auth.js";

const restrictToLoggedInUserOnly = async(req,res,next)=>{
    const userUID = req.cookies?.uid;
    if (!userUID){
    return res.redirect('/login')
    }
    const user = getUser(userUID);
    if(!user){
return res.redirect('/login')
    }
    req.user=user;
    console.log(user);
    next();
}
async function checkAuth(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
        if (userUid) {
            const user = getUser(userUid);
            req.user = user;
        }
        next();
    } catch (err) {
        console.log('Auth error:', err.message);
        next();  // Don't redirect, just continue without user
    }
}

export {restrictToLoggedInUserOnly, checkAuth}