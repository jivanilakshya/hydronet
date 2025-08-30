import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export interface JWTPayload {
  userId: string;
  email: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET!) as JWTPayload;
};

export const extractTokenFromCookie = (cookieHeader: string | undefined, tokenName = 'auth-token'): string | null => {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === tokenName) {
      return value;
    }
  }
  return null;
};
