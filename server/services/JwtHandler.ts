import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const { JWT_SECRET } = config;

class JwtHandler {
  static generateToken(payload: string, secret: string = JWT_SECRET) {
    return jwt.sign({ user: payload }, secret, { expiresIn: "1d" });
  }

  static verifyToken(
    token: string,
    secret: string = JWT_SECRET
  ): string | JwtPayload {
    return jwt.verify(token, secret);
  }
}

export default JwtHandler;
