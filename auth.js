const jwt = require('jsonwebtoken');
const config = require('config');



module.exports = function(req, res, next) {
//middleware callback

    const token = req.header('x-auth-token');
     // get the token from header

    
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
        // check if not token
    }

    
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
         // verify token

        req.user = decoded.user;
        //here is where the "user" property is attached to the decoded token, and we can use this user in any protected routes
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

}
