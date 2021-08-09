const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        console.log(req.headers.authorization);
        token = req.headers.authorization.split(" ")[1] || ""
    }

    try {
        console.log(process.env.JWT_SECRET);
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified.user
        console.log("Verification success!", verified)
        next()
    } catch (err) {
        console.log("Verification failed!", err)
        next()
    }
}

module.exports = { authenticate }
