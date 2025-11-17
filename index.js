import express from 'express';
import router from './routes/url.js'
import mongoose from 'mongoose';
import URL from './models/user.js'
import staticRoute from './routes/staticRouter.js'
import path from "path";
const app = express();
const PORT = 8000;
app.use(express.json());               
app.use(express.urlencoded({ extended: false}));
app.set('view engine','ejs')
app.set("views",path.resolve("./views"));

mongoose.connect('mongodb://localhost:27017/short-URL').then(()=>{
    console.log('mongodb connected')
}).catch(()=>{
    console.log('error in mongodb')
})

app.use('/',staticRoute)
app.use('/url',router);
app.get('/:shortid',async (req,res)=>{
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