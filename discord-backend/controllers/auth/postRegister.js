const catchAsyncErrors = require("../../middleware/catchAsyncErrors.js");
const userModel = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const postRegister = catchAsyncErrors(async (req, res, next) => {
  const { mail, username, password } = req.body;

  // Checking if the user exist with the same mail
  const userExist = await userModel.exists({ mail: mail.toLowerCase() });

  if (userExist) {
    return res.status(409).send("E-mail have been registered already");
  }

  // Encrypt the password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // create user Document and Save in database
  const user = await userModel.create({
    username,
    mail: mail.toLowerCase(),
    password: encryptedPassword,
  });

  // Create JWT Token
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

  res.status(201).json({
    userDetails: {
        mail: user.mail,
        token: token,
        username: user.username
    }
  })
});

module.exports = postRegister;
