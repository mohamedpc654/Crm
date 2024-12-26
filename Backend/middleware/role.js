// middleware/role.js
const roleAuthorization = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is set by the auth middleware
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = roleAuthorization;