const {validateToken} = require('../services/authentication');
function checkforAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookievalue = req.cookies[cookieName];
        if(!tokenCookievalue){
            return next();
        }
        try{
            const userPayload = validateToken(tokenCookievalue);
            req.user = userPayload;
        }catch(error){}
        next();
    };
}

module.exports = {checkforAuthenticationCookie};