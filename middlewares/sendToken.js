const jwt = require("jsonwebtoken");

exports.sendToken = (req, res, user) => {
  // create Jwt token 
  var token = jwt.sign(
    { user: user },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Store session data
  // req.session.isAuth = true;
  // req.session.user = user;
  // req.session.userAgent = req.get('User-Agent');
  // req.session.token = token;
  // req.session.UserId = user.id;

  res.status(200)
    .header('auth-token', token)
    .json({
      success: true,
      message: 'Auth successful',
      token,
      user,
    });
};
