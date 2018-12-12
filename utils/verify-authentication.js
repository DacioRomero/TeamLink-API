const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;

    if(auth != null) {
        [type, credentials] = auth.split(' ');

        switch(type) {
            case 'Bearer':
                try {
                    const decoded = jwt.verify(credentials, process.env.SECRET);
                    req.user = decoded;
                    return next();
                } catch(error) {
                    return res.status(403).send('Failed to verify JWT');
                }
            default:
                return res.status(403).send('Unrecognized authentication type');
        }
    }

    return res.status(403).send('Unauthorized');
}
