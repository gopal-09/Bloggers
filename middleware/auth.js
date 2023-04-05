const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token')
 // CHECK IF WE EVEN HAVE A TOKEN
    if(!token){
        res.status(401).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    }
    else{
    try {
        const decoded = await jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g")
        //console.log(decoded);
        req.user = decoded.email;
        next()
    } catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        })
    }
}
}
