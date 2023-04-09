import jwt from "jsonwebtoken";
import config from "../config/config";
import IJwtPayload from "../interfaces/JwtPayload";

const { JWT_SECRET } = config;

class JwtHandler {
  static generateToken(
    payload: IJwtPayload,
    expiry = "60s",
    secret: string = JWT_SECRET
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verifyToken(token: string, secret: string = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JwtHandler;
