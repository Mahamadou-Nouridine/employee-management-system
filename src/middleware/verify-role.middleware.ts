import { NextFunction, Request, Response } from "express";

export const verifyRoleMiddleWare =  (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
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
