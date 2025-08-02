// const authrizeRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         if(!allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Access Denied' });
//         }
//         next();
//     }
// }

// module.exports = authrizeRoles;

const authrizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    }
}
export { authrizeRoles };