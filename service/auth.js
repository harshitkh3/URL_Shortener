import jwt from 'jsonwebtoken'
const secret = "harshit$1234%^&"
function setUser(user){
    return jwt.sign({
        _id: user._id,
        email:user.email,
        name:user.name,
    },secret)
}

function getUser(token){
    if (!token) return null;
   return jwt.verify(token, secret);
}


export { setUser, getUser }