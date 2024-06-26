const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
 
    const decoded = jwt.verify(accessToken, secretKey);
    console.log(decoded);

    req.user = decoded.userId;
    console.log(req.user);
    return next();
  } catch (error) {
    // Access token verification failed
    if (!refreshToken) {
      return res
        .status(401)
        .send(
          "Access Denied. Invalid or expired access token and no refresh token provided."
        );
    }

    
    try {
      const decodedRefresh = jwt.verify(refreshToken, secretKey);
      
      const newAccessToken = jwt.sign(
        { user: decodedRefresh.user },
        secretKey,
        { expiresIn: "1h" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
      });
      req.user = decodedRefresh.user;
      return next();
    } catch (refreshError) {
      return res.status(400).send("Invalid refresh token.");
    }
  }
};

module.exports = { authenticate };