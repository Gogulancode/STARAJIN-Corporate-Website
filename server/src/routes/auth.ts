import { Router } from 'express';
import { prisma } from '../app';
import { hashPassword, comparePassword } from '../auth/password';
import { generateToken, authenticateToken } from '../auth/middleware';
import { asyncHandler, AppError } from '../utils/errorHandler';
import { validateRequest, loginSchema, createUserSchema, changePasswordSchema } from '../utils/validation';
import { User } from '../types/api';

const router = Router();

/**
 * POST /api/auth/login
 * User login
 */
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = validateRequest(loginSchema, req.body);

  // Find user by email
  const user = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase()
    }
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Check password
  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  // Format user response
  const userResponse: User = {
    id: user.id,
    email: user.email,
    firstName: undefined, // Temporarily set to undefined until schema is fixed
    lastName: undefined,  // Temporarily set to undefined until schema is fixed
    role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    isActive: true,       // Temporarily set to true until schema is fixed
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };

  res.json({
    success: true,
    data: {
      token,
      user: userResponse
    }
  });
}));

/**
 * POST /api/auth/register
 * Create new user (Admin only)
 */
router.post('/register', authenticateToken, asyncHandler(async (req, res) => {
  // Only admins can create users
  if (req.user?.role !== 'ADMIN') {
    throw new AppError('Only administrators can create users', 403);
  }

  const userData = validateRequest(createUserSchema, req.body);

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email: userData.email.toLowerCase() }
  });

  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  // Hash password
  const passwordHash = await hashPassword(userData.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: userData.email.toLowerCase(),
      passwordHash: passwordHash,
      role: userData.role
    }
  });

  // Format response
  const userResponse: User = {
    id: user.id,
    email: user.email,
    firstName: undefined, // Temporarily set until schema is fixed
    lastName: undefined,  // Temporarily set until schema is fixed
    role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    isActive: true,       // Temporarily set until schema is fixed
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };

  res.status(201).json({
    success: true,
    data: userResponse
  });
}));

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticateToken, asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
}));

/**
 * PUT /api/auth/profile
 * Update current user profile
 */
router.put('/profile', authenticateToken, asyncHandler(async (req, res) => {
  // Temporarily disabled profile updates until Prisma schema is fixed
  // const { firstName, lastName } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user!.id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const userResponse: User = {
    id: user.id,
    email: user.email,
    firstName: undefined, // Temporarily set until schema is fixed
    lastName: undefined,  // Temporarily set until schema is fixed
    role: user.role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    isActive: true,       // Temporarily set until schema is fixed
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };

  res.json({
    success: true,
    data: userResponse
  });
}));

/**
 * PUT /api/auth/password
 * Change user password
 */
router.put('/password', authenticateToken, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = validateRequest(changePasswordSchema, req.body);

  // Get current user with password hash
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Verify current password
  const isValidPassword = await comparePassword(currentPassword, user.passwordHash);
  if (!isValidPassword) {
    throw new AppError('Current password is incorrect', 400);
  }

  // Hash new password
  const newPasswordHash = await hashPassword(newPassword);

  // Update password hash
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newPasswordHash }
  });

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
}));

/**
 * POST /api/auth/logout
 * Logout (client-side token removal)
 */
router.post('/logout', authenticateToken, asyncHandler(async (req, res) => {
  // In a JWT-based system, logout is typically handled client-side
  // by removing the token. We could implement token blacklisting here
  // if needed for additional security.
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
}));

/**
 * GET /api/auth/verify
 * Verify token validity
 */
router.get('/verify', authenticateToken, asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      valid: true,
      user: req.user
    }
  });
}));

export default router;
