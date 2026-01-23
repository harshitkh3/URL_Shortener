import express from 'express';
import router from './routes/url.js'
import mongoose from 'mongoose';
import URL from './models/user.js'
import User from './models/details.js'
import staticRoute from './routes/staticRouter.js'
import path from "path";
import { getUser } from './service/auth.js';
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser';
import { restrictToLoggedInUserOnly, checkAuth } from './middlewares/auth.js';
const app = express();
const PORT = 8000;

// ✅ Middleware FIRST
app.use(express.json());               
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())
app.set('view engine','ejs')
app.set("views",path.resolve("./views"));

// ✅ Routes AFTER middleware
app.use('/url', router);
app.use('/user', userRoute)
app.use("/", staticRoute);

mongoose.connect('mongodb://localhost:27017/short-URL').then(()=>{
    console.log('mongodb connected')
}).catch(()=>{
    console.log('error in mongodb')
})

app.get('/find/:shortid',async (req,res)=>{
    const shortID = req.params.shortid;
    const link=await URL.findOneAndUpdate({shortID},{
        $push:{
            visitHistory:{
               timestamp:Date.now()
            }
        }
    })
    res.redirect(link.redirectedURL);
})

app.listen(PORT, ()=>{console.log(`Server listening at port ${PORT}`)})