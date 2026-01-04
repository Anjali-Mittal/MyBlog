const { validateToken } = require('../services/authentication');

function checkforAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies?.[cookieName];
    //default to null user
    req.user = null;
    res.locals.user = null;
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      // swallow error safely
        req.user = null;
        res.locals.user = null;
    }
    next();
  };
}

module.exports = { checkforAuthenticationCookie };
