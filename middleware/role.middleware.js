const authorizeRoles = (...authorizeRoles) => {
    return (req, res, next) => {
        console.log(req, "reqiejqwe")
        console.log(authorizeRoles, "authorizeRoleseewe")
        if (!authorizeRoles.includes(req.userRole)) {
            return res.status(403).json({ message: "Access denied", success: false })
        }
        next()
    }
}

export default authorizeRoles;