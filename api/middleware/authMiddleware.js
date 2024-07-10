import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("User not authenticated");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        req.userInfo = userInfo;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.userInfo.isAdmin === false) {
            return res.status(403).json("You are not allowed to perform this action because you are not an admin");
        }
        next();
    });
};

const verifyUserAccess = (req, res, next) => {
    verifyToken(req, res, () => {
        const userIdFromToken = req.userInfo.id;
        const userIdFromParams = req.params.userId;

        
        if (String(userIdFromToken) !== String(userIdFromParams)) {
            return res.status(403).json("You are not allowed to perform this action");
        }
        next();
    });
};
export { verifyToken, verifyAdmin, verifyUserAccess };
