const jwt = require('jsonwebtoken');

module.exports = {
    
    verifyUser : (req, res, next) => {
        const token = req.cookies.token;
        if(!token){
            res.json({Message: "we need token please provide it for next time"})
        } else{
            jwt.verify(token, "our-json-secret-key", (err, decoded) =>{
                if(err){
                    return res.json({Message: "Authentication Error."})
                } else {
                    req.username = decoded.username;
                    next();
                }
            })
        }
    }
}