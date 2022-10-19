const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js')
const userModel = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");

const postLogin = catchAsyncErrors( async (req,res,next) => {
    const { mail, password } = req.body

    // Finding the user exist
    const user = await userModel.findOne({ mail: mail.toLowerCase() })

    // Comparing the password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(user && passwordMatch) {
        // Send New Token
        const token = "Jwt_Token"

        return res.status(200).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
            }
        })
    }
    return res.status(400).send('Inavlid Credentials. Please try again')
})

module.exports = postLogin