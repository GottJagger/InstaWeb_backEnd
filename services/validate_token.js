const { json } = require("body-parser")
const jwt = require("jsonwebtoken")

const validate = async (req,res,next) =>{
    const token = req.header["token?auth"]

    if (!token) {
        return res.json({
            ok:false,
            message: "token no enviado"
        })
    }

    try {
        const validate = jwt.verify(token, process.env.SECRET_TOKEN)
        next()
    } catch (error) {
        return res.json({
            
        })
        
    }

}

module.exports = validate