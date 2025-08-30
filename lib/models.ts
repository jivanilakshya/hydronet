import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
  },
});

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
