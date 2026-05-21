import mongoose, { Schema, Document, Model } from 'mongoose'

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type UserPlan = 'free' | 'paid'

export interface IUser extends Document {
  email: string
  name?: string
  image?: string
  level: CefrLevel
  plan: UserPlan
  planExpiresAt?: Date
  dailyExerciseCount: number
  dailySpeakingCount: number
  lastActiveDate?: Date
  streak: number
  totalPoints: number
  referralCode?: string
  referredBy?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    image: String,
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CefrLevel[],
      default: 'A1',
    },
    plan: {
      type: String,
      enum: ['free', 'paid'] as UserPlan[],
      default: 'free',
    },
    planExpiresAt: Date,
    dailyExerciseCount: { type: Number, default: 0, min: 0 },
    dailySpeakingCount: { type: Number, default: 0, min: 0 },
    lastActiveDate: Date,
    streak: { type: Number, default: 0, min: 0 },
    totalPoints: { type: Number, default: 0, min: 0 },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: String,
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)
