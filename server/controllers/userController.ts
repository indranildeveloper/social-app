import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import config from "../config/config";

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */

const time = "";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber } = req.body;
});
