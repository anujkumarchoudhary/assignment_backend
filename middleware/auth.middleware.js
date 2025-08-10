import jwt from 'jsonwebtoken'
const AuthMiddleware = async (req, res, next) => {
    const authCheck = req.headers.authorization;
    if (!authCheck) {
        return res.status(404).json({ message: "token not found" })
    }
    const token = authCheck.split(" ")[1]
    const decode = jwt.verify(token, process.env.SECRET_CODE)
    req.userId = decode.id;
    req.userRole = decode.role;
    next()

    try {

    }
    catch (err) {
        console.log("error", err)
    }

}

export default AuthMiddleware;