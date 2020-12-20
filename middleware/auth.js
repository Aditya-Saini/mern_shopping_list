const config = require('config'),
      jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const token = erq.header('x-auth-token');

    //check for token
    if(!token) {
        res.status(401).json({ msg: 'No token, authorization denied'});
    }
    try{

        //verify token
    const decoded = jwr.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();

    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
    
}

module.exports = auth;