import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import User, {IUserDocument} from "../models/user.model";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      throw createError.BadRequest();
    }

    const doesExist: IUserDocument | null = await User.findOne({
      email: email,
    });

    if (doesExist) {
      throw createError.Conflict(`${email} is already registered`);
    }

    const user: IUserDocument = new User({ email, password });
    const savedUser: IUserDocument = await user.save();

    res.send(savedUser);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};



export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};