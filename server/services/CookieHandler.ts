import { Response } from "express";

class CookieHandler {
  static setCookie(res: Response, cookieName: string, token: string) {
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  static destroyCooKie(res: Response, cookieName: string) {
    res.cookie(cookieName, "", {
      httpOnly: true,
      expires: new Date(0),
    });
  }
}

export default CookieHandler;
