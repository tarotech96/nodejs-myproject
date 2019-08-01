// Create function verifyToken() to check whether or not a token exists
module.exports = function verifyToken(req, res, next) {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // get bearerToken from request
        var bearerToken = bearerHeader.split(' ')[1];
        // Set token vào trong request
        req.token = bearerToken;
        // next middware
        next();
    } else {
        res.sendStatus(403).send('Token is null');
    }
}