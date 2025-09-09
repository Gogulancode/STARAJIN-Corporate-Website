import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { User } from '../types/api';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-development-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Generate JWT token for user
 */
export function generateToken(user: { id: number; email: string; role: string }): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET as string, { 
    expiresIn: JWT_EXPIRES_IN 
  } as jwt.SignOptions);
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

/**
 * Authentication middleware - validates JWT token
 */
export async function authenticateToken(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access token required'
    });
    return;
  }

  try {
    const payload = verifyToken(token);
    
    // Fetch user from database to ensure they still exist
    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId
      }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
      return;
    }

    // Add user to request - temporarily using hardcoded values until schema is fixed
    req.user = {
      id: user.id,
      email: user.email,
      firstName: undefined, // Temporarily set until schema is fixed
      lastName: undefined,  // Temporarily set until schema is fixed
      role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
      isActive: true,       // Temporarily set until schema is fixed
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}

/**
 * Authorization middleware - checks user role permissions
 */
export function requireRole(...allowedRoles: ('ADMIN' | 'EDITOR' | 'VIEWER')[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
}

/**
 * Optional authentication - adds user to request if token is present
 */
export async function optionalAuth(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyToken(token);
    
    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId
      }
    });

    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        firstName: undefined, // Temporarily set until schema is fixed
        lastName: undefined,  // Temporarily set until schema is fixed
        role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
        isActive: true,       // Temporarily set until schema is fixed
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      };
    }
  } catch (error) {
    // Ignore invalid tokens for optional auth
  }

  next();
}
