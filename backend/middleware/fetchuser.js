const jwtoken = require('jsonwebtoken');
const jwt_sign = 'Godspeedallmight'

const fetchusers = (req, res, next)=>{
    try {
        // get user from jwt token and add id to req object

        const token = req.header('auth-token');
        // if access denied
        if(!token)
        {
            console.error(error.message);  
            res.status(401).send({error: "Please Authenticate Using Valid Token !"});
        }
        const data = jwtoken.verify(token, jwt_sign);
        req.user = data.user
        next()
    } catch (error) {
        console.error(error.message);  
        res.status(500).send({error: "Internal Server Error"});
    }

}

module.exports = fetchusers