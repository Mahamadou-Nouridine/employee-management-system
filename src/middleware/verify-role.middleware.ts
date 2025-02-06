import { NextFunction, Request, Response } from "express";

export const verifyRoleMiddleWare = async (roles: string[]): Promise<any> => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (
      req as unknown as Request & {
        jwtData: {
          id: string;
          role: string;
        };
      }
    ).jwtData.role;

    if (!roles.includes(role))
      return res.status(403).json({ message: "access denied" });
    return next();
  };
};
