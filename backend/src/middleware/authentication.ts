import APIError from "../utils/APIError";
import jwt from "jsonwebtoken";

export const authenticateUserJWTToken =
  () => async (req: any, res, next) => {
    try {
      const authenticationToken = req.headers["accesstoken"];
      if (!authenticationToken) {
        throw new APIError({
          status: 401,
          message: "You need to pass accessToken in header",
        });
      } else {
        // verify jwt token
        try {
          const secret: any = process.env.JWT_SECRET;
          jwt.verify(authenticationToken, secret);
          req.user = jwt.decode(authenticationToken)
          return next();
        } catch (error) {
          throw new APIError({
            status: 403,
            message: "Access token is not valid",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };



