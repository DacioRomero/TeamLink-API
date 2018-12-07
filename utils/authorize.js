const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers);
    const auth = req.headers.authorization;

    if(auth != null) {
        [type, credentials] = auth.split(' ');
        console.log(type)

        switch(type) {
            case 'Bearer':
                console.log('Decoding JWT');
                try {
                    const decoded = jwt.verify(credentials, process.env.SECRET);
                    req.user = decoded;
                    return next();
                } catch(error) {
                    return res.status(403).send('Failed to verify JWT');
                }
            default:
                return res.status(403).send('Unrecongized authentication type');
        }
    }

    return res.status(403).send('Unauthorized');
}
