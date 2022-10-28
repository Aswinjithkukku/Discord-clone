const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js')
const userModel = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const postLogin = catchAsyncErrors( async (req,res,next) => {
    const { mail, password } = req.body

    // Finding the user exist
    const user = await userModel.findOne({ mail: mail.toLowerCase() })

    // Comparing the password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(user && passwordMatch) {
        // Send New Token
        const token = jwt.sign(
            {
              userId: user._id,
              mail
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: '24h'
            }
          )

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