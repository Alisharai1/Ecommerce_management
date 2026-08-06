import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string; 
}

export const authenticateToken =
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader;

        if (!token) {
            res.status(401).json({
                message: 'Unauthorized. No token provided.'
            });
            return;
        }

        try {
            const decoded = jwt.verify(token, "qwertyui") as { userId: string };
            req.userId = decoded.userId;

            next();
        } catch (error) {
            res.status(403).json({
                message: 'Forbidden - Invalid or expired token',
            });
            return;
        }
    };
