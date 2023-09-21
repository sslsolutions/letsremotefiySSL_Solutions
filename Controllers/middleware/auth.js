const jwt=require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const verifyToken = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
      return res.redirect('/login'); // Redirect to the login page if no token
    }
  
    jwt.verify(token, process.env.JWT_SCERET_KEY, (err, decoded) => {
      if (err) {
        return res.redirect('/login'); // Redirect if token is invalid
      }
  
      // Attach user data to the request for use in protected routes
      req.user = decoded;
      next(); // Continue to the protected route
    });
}
module.exports =verifyToken