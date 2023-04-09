import jwt from "jsonwebtoken";
import config from "../config/config";

const { JWT_SECRET } = config;

interface IJwtPayload {
  user: string;
}

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
